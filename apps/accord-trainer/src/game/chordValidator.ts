function normalizeNote(note: string): string {
  return note
    .trim()
    .replace(/[0-9]/g, "")
    .replace("♯", "#")
    .replace("♭", "b");
}

export function normalizeNotes(notes: string[]): string[] {
  return [...new Set(notes.map(normalizeNote).filter(Boolean))].sort();
}

export function validateChord(
  expectedNotes: string[],
  detectedNotes: string[]
): boolean {
  const expected = normalizeNotes(expectedNotes);
  const detected = normalizeNotes(detectedNotes);

  if (detected.length !== expected.length) {
    return false;
  }

  return expected.every((note) => detected.includes(note));
}