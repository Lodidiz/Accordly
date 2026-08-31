import { describe, expect, it } from "vitest";

import { CHORDS } from "./chords";

const PITCH_CLASSES: Record<string, number> = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11,
};

describe("CHORDS", () => {
  it("contains the expected catalogue split", () => {
    expect(CHORDS).toHaveLength(24);
    expect(CHORDS.filter(({ quality }) => quality === "major")).toHaveLength(12);
    expect(CHORDS.filter(({ quality }) => quality === "minor")).toHaveLength(12);
    expect(CHORDS.filter(({ hasAccidental }) => !hasAccidental)).toHaveLength(14);
    expect(CHORDS.filter(({ hasAccidental }) => hasAccidental)).toHaveLength(10);
  });

  it("uses unique identifiers derived from the root and quality", () => {
    const ids = CHORDS.map(({ id }) => id);

    expect(new Set(ids).size).toBe(CHORDS.length);

    for (const chord of CHORDS) {
      expect(chord.id).toBe(`${chord.root}-${chord.quality}`);
    }
  });

  it("contains three distinct notes and a consistent label for every chord", () => {
    for (const chord of CHORDS) {
      expect(chord.notes).toHaveLength(3);
      expect(new Set(chord.notes).size).toBe(3);
      expect(chord.label).toBe(
        chord.quality === "minor" ? `${chord.root}m` : chord.root
      );
      expect(chord.hasAccidental).toBe(chord.root.includes("#"));
    }
  });

  it("defines the expected intervals for every major and minor triad", () => {
    for (const chord of CHORDS) {
      const root = PITCH_CLASSES[chord.root];
      const intervals = chord.notes
        .map((note) => (PITCH_CLASSES[note] - root + 12) % 12)
        .sort((left, right) => left - right);

      expect(intervals, chord.id).toEqual(
        chord.quality === "major" ? [0, 4, 7] : [0, 3, 7]
      );
    }
  });
});
