import { afterEach, describe, expect, it, vi } from "vitest";

import { drawRandomChord, getAvailableChords } from "./chordGenerator";
import type { GameConfig } from "./types";

const DEFAULT_CONFIG: GameConfig = {
  totalChords: 10,
  includeMajor: true,
  includeMinor: true,
  includeAccidentals: false,
};

function makeConfig(overrides: Partial<GameConfig> = {}): GameConfig {
  return { ...DEFAULT_CONFIG, ...overrides };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getAvailableChords", () => {
  it.each([
    ["natural major and minor chords", makeConfig(), 14],
    [
      "natural major chords",
      makeConfig({ includeMinor: false }),
      7,
    ],
    [
      "natural minor chords",
      makeConfig({ includeMajor: false }),
      7,
    ],
    [
      "all major chords",
      makeConfig({ includeMinor: false, includeAccidentals: true }),
      12,
    ],
    [
      "all minor chords",
      makeConfig({ includeMajor: false, includeAccidentals: true }),
      12,
    ],
    ["the complete catalogue", makeConfig({ includeAccidentals: true }), 24],
    [
      "no chord when both qualities are disabled",
      makeConfig({ includeMajor: false, includeMinor: false }),
      0,
    ],
  ])("returns %s", (_label, config, expectedCount) => {
    expect(getAvailableChords(config)).toHaveLength(expectedCount);
  });

  it("never includes a disabled quality or accidental root", () => {
    const chords = getAvailableChords(
      makeConfig({ includeMajor: false, includeAccidentals: false })
    );

    expect(chords.every(({ quality }) => quality === "minor")).toBe(true);
    expect(chords.every(({ hasAccidental }) => !hasAccidental)).toBe(true);
  });
});

describe("drawRandomChord", () => {
  it("throws when the configuration has no available chord", () => {
    const config = makeConfig({ includeMajor: false, includeMinor: false });

    expect(() => drawRandomChord(config)).toThrow(
      "Aucun accord disponible avec cette configuration."
    );
  });

  it.each([
    [0, 0],
    [0.5, 7],
    [0.999999, 13],
  ])("selects the expected filtered chord for random value %s", (random, index) => {
    const availableChords = getAvailableChords(DEFAULT_CONFIG);
    vi.spyOn(Math, "random").mockReturnValue(random);

    expect(drawRandomChord(DEFAULT_CONFIG)).toBe(availableChords[index]);
  });

  it("does not immediately repeat the previous chord", () => {
    const availableChords = getAvailableChords(DEFAULT_CONFIG);
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(drawRandomChord(DEFAULT_CONFIG, availableChords[0].id)).toBe(
      availableChords[1]
    );
  });

  it("still returns an available chord when the previous id is unknown", () => {
    const availableChords = getAvailableChords(DEFAULT_CONFIG);
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(drawRandomChord(DEFAULT_CONFIG, "unknown-chord")).toBe(
      availableChords[0]
    );
  });
});
