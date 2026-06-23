import { CHORDS } from "./chords";
import type { Chord, GameConfig } from "./types";

export function getAvailableChords(config: GameConfig): Chord[] {
  return CHORDS.filter((chord) => {
    if (chord.quality === "major" && !config.includeMajor) return false;
    if (chord.quality === "minor" && !config.includeMinor) return false;
    if (chord.hasAccidental && !config.includeAccidentals) return false;

    return true;
  });
}

export function drawRandomChord(
  config: GameConfig,
  previousChordId?: string
): Chord {
  const availableChords = getAvailableChords(config);

  if (availableChords.length === 0) {
    throw new Error("Aucun accord disponible avec cette configuration.");
  }

  const filteredChords =
    availableChords.length > 1
      ? availableChords.filter((chord) => chord.id !== previousChordId)
      : availableChords;

  const randomIndex = Math.floor(Math.random() * filteredChords.length);

  return filteredChords[randomIndex];
}