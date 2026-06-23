const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function midiToNoteName(midi: number): string {
  const noteIndex = ((Math.round(midi) % 12) + 12) % 12;
  return NOTE_NAMES[noteIndex];
}

export function normalizeNoteName(note: string): string {
  return note
    .trim()
    .replace(/[0-9]/g, "")
    .replace("♯", "#")
    .replace("♭", "b");
}

export function uniqueNormalizedNotes(notes: string[]): string[] {
  return [...new Set(notes.map(normalizeNoteName).filter(Boolean))].sort();
}