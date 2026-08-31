import { describe, expect, it } from "vitest";

import { normalizeNotes, validateChord } from "./chordValidator";

describe("normalizeNotes", () => {
  it("removes octaves and whitespace, normalizes symbols, deduplicates and sorts", () => {
    expect(normalizeNotes([" G4 ", "C3", "F♯5", "F#2", ""])).toEqual([
      "C",
      "F#",
      "G",
    ]);
  });

  it("normalizes the flat symbol", () => {
    expect(normalizeNotes(["B♭3", "Bb4"])).toEqual(["Bb"]);
  });
});

describe("validateChord", () => {
  it("accepts the expected pitch classes regardless of order and octave", () => {
    expect(validateChord(["C", "E", "G"], ["G5", "C3", "E4"])).toBe(true);
  });

  it("accepts duplicate detections of an expected pitch class", () => {
    expect(validateChord(["C", "E", "G"], ["C3", "E4", "G4", "C5"])).toBe(
      true
    );
  });

  it("accepts equivalent ASCII and musical accidental symbols", () => {
    expect(validateChord(["D", "F#", "A"], ["A3", "D4", "F♯4"])).toBe(true);
    expect(validateChord(["Bb", "D", "F"], ["F3", "B♭3", "D4"])).toBe(true);
  });

  it.each([
    ["a missing note", ["C", "E"]],
    ["an extra note", ["C", "E", "G", "B"]],
    ["a wrong note", ["C", "F", "G"]],
  ])("rejects %s", (_label, detectedNotes) => {
    expect(validateChord(["C", "E", "G"], detectedNotes)).toBe(false);
  });

  it("does not treat enharmonic spellings as equivalent", () => {
    expect(validateChord(["C#", "F", "G#"], ["Db", "F", "Ab"])).toBe(false);
  });

  it("keeps note-name matching case-sensitive", () => {
    expect(validateChord(["C", "E", "G"], ["c", "e", "g"])).toBe(false);
  });
});
