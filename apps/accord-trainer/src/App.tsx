import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import {
  analyzeAudioBlob,
  extractUniqueNotes,
  getBlobRmsLevel,
} from "./audio/basicPitchEngine";
import { recordAudioChunk } from "./audio/recordAudio";

import { drawRandomChord } from "./game/chordGenerator";
import { normalizeNotes, validateChord } from "./game/chordValidator";
import type {
  Chord,
  GameConfig,
  GameStatus,
  SessionResult,
} from "./game/types";

const HISTORY_STORAGE_KEY = "accord-trainer-history";

const DEFAULT_CONFIG: GameConfig = {
  totalChords: 10,
  includeMajor: true,
  includeMinor: true,
  includeAccidentals: false,
};

const AUDIO_CONFIG = {
  useAdaptiveThreshold: false,
  manualThreshold: 0.015,
  defaultNoiseFloor: 0.005,
  adaptiveMultiplier: 3,
  minAdaptiveThreshold: 0.012,
};

function formatTime(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return "0.0s";

  const seconds = ms / 1000;

  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  return `${minutes}m${remainingSeconds.toString().padStart(2, "0")}`;
}

function loadHistory(): SessionResult[] {
  try {
    const rawHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!rawHistory) return [];

    return JSON.parse(rawHistory) as SessionResult[];
  } catch {
    return [];
  }
}

function saveHistoryEntry(entry: SessionResult): void {
  const currentHistory = loadHistory();
  const nextHistory = [entry, ...currentHistory].slice(0, 20);

  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
}

function App() {
  const [status, setStatus] = useState<GameStatus>("home");
  const statusRef = useRef<GameStatus>(status);

  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [countdown, setCountdown] = useState(3);

  const [currentChord, setCurrentChord] = useState<Chord | null>(null);
  const [previousChordId, setPreviousChordId] = useState<string | undefined>();

  const [validatedCount, setValidatedCount] = useState(0);
  const [currentChordStartedAt, setCurrentChordStartedAt] =
    useState<number | null>(null);

  const currentChordStartedAtRef = useRef<number | null>(null);

  const [now, setNow] = useState(Date.now());
  const [chordTimes, setChordTimes] = useState<number[]>([]);
  const [history, setHistory] = useState<SessionResult[]>(() => loadHistory());

  const [lastDetectedNotes, setLastDetectedNotes] = useState<string[]>([]);
  const [lastRmsLevel, setLastRmsLevel] = useState(0);
  const [currentRmsThreshold, setCurrentRmsThreshold] = useState(
    AUDIO_CONFIG.manualThreshold
  );

  const isRecordingRef = useRef(false);
  const noiseFloorRef = useRef(AUDIO_CONFIG.defaultNoiseFloor);
  const rmsThresholdRef = useRef(AUDIO_CONFIG.manualThreshold);

  const canLaunchSession = config.includeMajor || config.includeMinor;

  const currentChordTimeMs = useMemo(() => {
    if (!currentChordStartedAt) return 0;
    return now - currentChordStartedAt;
  }, [now, currentChordStartedAt]);

  const totalTimeMs = useMemo(() => {
    return chordTimes.reduce((sum, time) => sum + time, 0);
  }, [chordTimes]);

  const averageTimeMs = useMemo(() => {
    if (chordTimes.length === 0) return 0;
    return totalTimeMs / chordTimes.length;
  }, [totalTimeMs, chordTimes.length]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    currentChordStartedAtRef.current = currentChordStartedAt;
  }, [currentChordStartedAt]);

  useEffect(() => {
    if (status !== "playing" && status !== "failure" && status !== "success") {
      return;
    }

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 100);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== "countdown") return;

    if (countdown <= 0) {
      const firstChord = drawRandomChord(config);

      setCurrentChord(firstChord);
      setPreviousChordId(firstChord.id);

      const startedAt = Date.now();

      setCurrentChordStartedAt(startedAt);
      currentChordStartedAtRef.current = startedAt;

      setLastDetectedNotes([]);
      setNow(Date.now());
      setStatus("playing");

      return;
    }

    const timeout = window.setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [status, countdown, config]);

  useEffect(() => {
    if (status !== "playing") {
      isRecordingRef.current = false;
    }
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    if (!currentChord) return;

    const activeChord = currentChord;
    let cancelled = false;

    async function runAudioLoop() {
      if (isRecordingRef.current) return;

      isRecordingRef.current = true;

      try {
        const blob = await recordAudioChunk(2000);
        const rmsLevel = await getBlobRmsLevel(blob);

        setLastRmsLevel(rmsLevel);
        setCurrentRmsThreshold(rmsThresholdRef.current);

        console.log("Niveau audio RMS :", rmsLevel);

        if (rmsLevel < rmsThresholdRef.current) {
          if (AUDIO_CONFIG.useAdaptiveThreshold) {
            noiseFloorRef.current =
              noiseFloorRef.current * 0.9 + rmsLevel * 0.1;

            rmsThresholdRef.current = Math.max(
              noiseFloorRef.current * AUDIO_CONFIG.adaptiveMultiplier,
              AUDIO_CONFIG.minAdaptiveThreshold
            );
          }

          console.log("Silence / bruit faible ignoré", {
            rmsLevel,
            mode: AUDIO_CONFIG.useAdaptiveThreshold ? "auto" : "manuel",
            noiseFloor: noiseFloorRef.current,
            threshold: rmsThresholdRef.current,
          });

          return;
        }

        console.log("Signal détecté", {
          rmsLevel,
          mode: AUDIO_CONFIG.useAdaptiveThreshold ? "auto" : "manuel",
          threshold: rmsThresholdRef.current,
        });

        const detectedNotes = await analyzeAudioBlob(blob);
        const uniqueNotes = extractUniqueNotes(detectedNotes);

        setLastDetectedNotes(uniqueNotes);

        console.log("Accord attendu :", activeChord.label, activeChord.notes);
        console.log("Notes détectées :", uniqueNotes);

        if (!cancelled && statusRef.current === "playing") {
          evaluateDetectedNotesForChord(activeChord, uniqueNotes);
        }
      } catch (error) {
        console.error("Erreur audio :", error);
      } finally {
        isRecordingRef.current = false;

        if (!cancelled && statusRef.current === "playing") {
          runAudioLoop();
        }
      }
    }

    runAudioLoop();

    return () => {
      cancelled = true;
      isRecordingRef.current = false;
    };
  }, [status, currentChord?.id]);

  function resetNoiseCalibration() {
    noiseFloorRef.current = AUDIO_CONFIG.defaultNoiseFloor;
    rmsThresholdRef.current = AUDIO_CONFIG.manualThreshold;
    setLastRmsLevel(0);
    setLastDetectedNotes([]);
    setCurrentRmsThreshold(AUDIO_CONFIG.manualThreshold);
  }

  function updateConfig(partialConfig: Partial<GameConfig>) {
    setConfig((currentConfig) => ({
      ...currentConfig,
      ...partialConfig,
    }));
  }

  function goToConfig() {
    setStatus("config");
  }

  function goHome() {
    setStatus("home");
  }

  function goToHistory() {
    setHistory(loadHistory());
    setStatus("history");
  }

  function startSession() {
    if (!canLaunchSession) return;

    setCountdown(3);
    setCurrentChord(null);
    setPreviousChordId(undefined);
    setValidatedCount(0);
    setChordTimes([]);

    setCurrentChordStartedAt(null);
    currentChordStartedAtRef.current = null;

    setNow(Date.now());
    resetNoiseCalibration();
    setStatus("countdown");
  }

  function finishSession(finalChordTimes: number[]) {
    const finalTotalTimeMs = finalChordTimes.reduce(
      (sum, time) => sum + time,
      0
    );

    const finalAverageTimeMs =
      finalChordTimes.length > 0
        ? finalTotalTimeMs / finalChordTimes.length
        : 0;

    const result: SessionResult = {
      date: new Date().toISOString(),
      totalChords: config.totalChords,
      totalTimeMs: finalTotalTimeMs,
      averageTimeMs: finalAverageTimeMs,
    };

    saveHistoryEntry(result);
    setHistory(loadHistory());

    setCurrentChordStartedAt(null);
    currentChordStartedAtRef.current = null;

    setStatus("result");
  }

  function moveToNextChord() {
    const nextChord = drawRandomChord(config, previousChordId);

    setCurrentChord(nextChord);
    setPreviousChordId(nextChord.id);

    const startedAt = Date.now();

    setCurrentChordStartedAt(startedAt);
    currentChordStartedAtRef.current = startedAt;

    setLastDetectedNotes([]);
    setNow(Date.now());
    setStatus("playing");
  }

  function evaluateDetectedNotesForChord(chord: Chord, detectedNotes: string[]) {
    if (statusRef.current !== "playing") return;

    const startedAt = currentChordStartedAtRef.current;
    if (!startedAt) return;

    const isCorrect = validateChord(chord.notes, detectedNotes);

    console.log("Validation directe :", {
      expected: normalizeNotes(chord.notes),
      detected: normalizeNotes(detectedNotes),
      isCorrect,
    });

    if (!isCorrect) {
      setStatus("failure");

      window.setTimeout(() => {
        if (statusRef.current === "failure") {
          setStatus("playing");
        }
      }, 1000);

      return;
    }

    const chordTime = Date.now() - startedAt;
    const nextChordTimes = [...chordTimes, chordTime];
    const nextValidatedCount = validatedCount + 1;

    setChordTimes(nextChordTimes);
    setValidatedCount(nextValidatedCount);
    setStatus("success");

    window.setTimeout(() => {
      if (nextValidatedCount >= config.totalChords) {
        finishSession(nextChordTimes);
      } else {
        moveToNextChord();
      }
    }, 500);
  }

  function evaluateDetectedNotes(detectedNotes: string[]) {
    if (!currentChord) return;

    evaluateDetectedNotesForChord(currentChord, detectedNotes);
  }

  return (
    <main className="app">
      {status === "home" && (
        <section className="screen home-screen">
          <div className="hero">
            <p className="eyebrow">Accord Trainer</p>
            <h1>
              Accord
              <br />
              Trainer
            </h1>
            <p className="baseline">Défis d’accords aléatoires</p>
          </div>

          <div className="actions">
            <button className="primary-button" onClick={goToConfig}>
              Jouer
            </button>

            <button className="secondary-button" onClick={goToHistory}>
              Historique
            </button>
          </div>
        </section>
      )}

      {status === "config" && (
        <section className="screen config-screen">
          <header className="screen-header">
            <p className="eyebrow">Configuration</p>
            <h1>Préparer la session</h1>
          </header>

          <div className="config-block">
            <h2>Nombre d’accords</h2>

            <div className="choice-row">
              {[10, 20, 50].map((value) => (
                <button
                  key={value}
                  className={
                    config.totalChords === value
                      ? "choice-button selected"
                      : "choice-button"
                  }
                  onClick={() =>
                    updateConfig({
                      totalChords: value as GameConfig["totalChords"],
                    })
                  }
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="config-block">
            <h2>Types d’accords</h2>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={config.includeMajor}
                onChange={(event) =>
                  updateConfig({ includeMajor: event.target.checked })
                }
              />
              <span>Majeurs</span>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={config.includeMinor}
                onChange={(event) =>
                  updateConfig({ includeMinor: event.target.checked })
                }
              />
              <span>Mineurs</span>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={config.includeAccidentals}
                onChange={(event) =>
                  updateConfig({ includeAccidentals: event.target.checked })
                }
              />
              <span>Dièses / bémols</span>
            </label>
          </div>

          {!canLaunchSession && (
            <p className="warning">Sélectionne au moins un type d’accord.</p>
          )}

          <div className="bottom-actions">
            <button className="secondary-button" onClick={goHome}>
              Accueil
            </button>

            <button
              className="primary-button"
              onClick={startSession}
              disabled={!canLaunchSession}
            >
              Lancer
            </button>
          </div>
        </section>
      )}

      {status === "countdown" && (
        <section className="screen countdown-screen">
          <p className="eyebrow">Décompte</p>
          <div className="countdown-number">{countdown}</div>
          <p className="baseline">Micro activé au lancement</p>
        </section>
      )}

      {(status === "playing" || status === "success" || status === "failure") &&
        currentChord && (
          <section
            className={[
              "screen",
              "game-screen",
              status === "success" ? "success-state" : "",
              status === "failure" ? "failure-state" : "",
            ].join(" ")}
          >
            <div className="game-topbar">
              <span>
                {validatedCount} / {config.totalChords}
              </span>
              <span>{formatTime(currentChordTimeMs)}</span>
            </div>

            <div className="chord-zone">
              <div className="chord-display">
                {status === "success" && "✓ "}
                {status === "failure" && "✕ "}
                {currentChord.label}
              </div>

              <p className="listening-label">
                {status === "playing" && "🎤 écoute en cours"}
                {status === "success" && "Accord reconnu"}
                {status === "failure" && "Accord non reconnu"}
              </p>

              <p className="detected-notes">
                Détecté :{" "}
                {lastDetectedNotes.length > 0
                  ? lastDetectedNotes.join(" · ")
                  : "—"}
              </p>

              <p className="detected-notes">
                Seuil :{" "}
                {AUDIO_CONFIG.useAdaptiveThreshold ? "auto" : "manuel"} · RMS :{" "}
                {lastRmsLevel.toFixed(5)} · limite :{" "}
                {currentRmsThreshold.toFixed(5)}
              </p>
            </div>

            <div className="feedback-card">
              {status === "playing" && "blanc = attente"}
              {status === "success" &&
                "vert brièvement → tirage automatique du prochain accord"}
              {status === "failure" &&
                "rouge 1 seconde → même accord conservé"}
            </div>

            <div className="debug-panel">
              <p>Debug temporaire</p>

              <div className="debug-actions">
                <button
                  className="secondary-button"
                  onClick={() => evaluateDetectedNotes(currentChord.notes)}
                  disabled={status !== "playing"}
                >
                  Debug correct
                </button>

                <button
                  className="secondary-button"
                  onClick={() => evaluateDetectedNotes(["C", "D", "G"])}
                  disabled={status !== "playing"}
                >
                  Debug faux
                </button>
              </div>

              <p className="debug-notes">
                Notes attendues : {currentChord.notes.join(" · ")}
              </p>
            </div>
          </section>
        )}

      {status === "result" && (
        <section className="screen result-screen">
          <header className="screen-header">
            <p className="eyebrow">Résultat</p>
            <h1>
              Session
              <br />
              terminée
            </h1>
          </header>

          <div className="metrics">
            <div className="metric-card">{config.totalChords} accords</div>
            <div className="metric-card">
              Temps total : {formatTime(totalTimeMs)}
            </div>
            <div className="metric-card">
              Temps moyen : {formatTime(averageTimeMs)}
            </div>
          </div>

          <div className="bottom-actions">
            <button className="secondary-button" onClick={goHome}>
              Accueil
            </button>

            <button className="primary-button" onClick={startSession}>
              Rejouer
            </button>
          </div>
        </section>
      )}

      {status === "history" && (
        <section className="screen history-screen">
          <header className="screen-header">
            <p className="eyebrow">Historique</p>
            <h1>Sessions</h1>
          </header>

          {history.length === 0 ? (
            <p className="empty-history">
              Aucune session enregistrée pour le moment.
            </p>
          ) : (
            <div className="history-list">
              {history.map((entry, index) => (
                <div className="history-row" key={`${entry.date}-${index}`}>
                  <span>
                    {new Date(entry.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>

                  <span>{entry.totalChords} accords</span>
                  <span>{formatTime(entry.averageTimeMs)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="bottom-actions">
            <button className="primary-button" onClick={goHome}>
              Accueil
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;