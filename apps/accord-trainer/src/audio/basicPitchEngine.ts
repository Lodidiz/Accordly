import {
  BasicPitch,
  addPitchBendsToNoteEvents,
  noteFramesToTime,
  outputToNotesPoly,
} from "@spotify/basic-pitch";

import { midiToNoteName } from "./noteUtils";

export type DetectedNote = {
  note: string;
  midi: number;
  amplitude: number;
};

let basicPitch: BasicPitch | null = null;

function getEngine() {
  if (!basicPitch) {
    console.log("Création moteur Basic Pitch");
    basicPitch = new BasicPitch("/basic-pitch-model/model.json");
  }

  return basicPitch;
}

export async function getBlobRmsLevel(blob: Blob): Promise<number> {
  const arrayBuffer = await blob.arrayBuffer();

  const audioContext = new AudioContext();
  const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));

  const channelData = decodedBuffer.getChannelData(0);

  let sumSquares = 0;

  for (let i = 0; i < channelData.length; i++) {
    sumSquares += channelData[i] * channelData[i];
  }

  await audioContext.close();

  return Math.sqrt(sumSquares / channelData.length);
}

export async function analyzeAudioBlob(blob: Blob): Promise<DetectedNote[]> {
  console.log("1. Début analyse");
  console.log("Blob:", blob.size, blob.type);

  const arrayBuffer = await blob.arrayBuffer();
  console.log("2. ArrayBuffer OK", arrayBuffer.byteLength);

  const audioContext = new AudioContext();
  console.log("3. AudioContext OK");

  const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));

  const offlineContext = new OfflineAudioContext(
    1,
    Math.ceil(decodedBuffer.duration * 22050),
    22050
  );

  const source = offlineContext.createBufferSource();
  source.buffer = decodedBuffer;
  source.connect(offlineContext.destination);
  source.start(0);

  const audioBuffer = await offlineContext.startRendering();

  console.log(
    "4. Decode + resample audio OK",
    audioBuffer.duration,
    audioBuffer.sampleRate
  );

  const frames: number[][] = [];
  const onsets: number[][] = [];
  const contours: number[][] = [];

  const engine = getEngine();

  console.log("5. Engine créé");
  console.log("6. Avant evaluateModel");

  await engine.evaluateModel(
    audioBuffer,
    (f, o, c) => {
      frames.push(...f);
      onsets.push(...o);
      contours.push(...c);
    },
    (percent) => {
      console.log("Progress:", percent);
    }
  );

  console.log("7. Après evaluateModel");
  console.log("Frames:", frames.length);
  console.log("Onsets:", onsets.length);
  console.log("Contours:", contours.length);

  const noteEvents = noteFramesToTime(
    addPitchBendsToNoteEvents(
      contours,
      outputToNotesPoly(frames, onsets, 0.25, 0.25, 5)
    )
  );

  console.log("8. Notes events:", noteEvents);

  await audioContext.close();

  return noteEvents.map((event) => ({
    note: midiToNoteName(event.pitchMidi),
    midi: event.pitchMidi,
    amplitude: event.amplitude,
  }));
}

export function extractUniqueNotes(notes: DetectedNote[]): string[] {
  const bestByNote = new Map<string, DetectedNote>();

  for (const note of notes) {
    const existing = bestByNote.get(note.note);

    if (!existing || note.amplitude > existing.amplitude) {
      bestByNote.set(note.note, note);
    }
  }

  return Array.from(bestByNote.values())
    .filter((note) => note.amplitude > 0.25)
    .sort((a, b) => b.amplitude - a.amplitude)
    .slice(0, 3)
    .map((note) => note.note)
    .sort();
}