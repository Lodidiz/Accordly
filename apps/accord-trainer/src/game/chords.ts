import type { Chord } from "./types";

export const CHORDS: Chord[] = [
  { id: "C-major", label: "C", root: "C", quality: "major", notes: ["C", "E", "G"], hasAccidental: false },
  { id: "D-major", label: "D", root: "D", quality: "major", notes: ["D", "F#", "A"], hasAccidental: false },
  { id: "E-major", label: "E", root: "E", quality: "major", notes: ["E", "G#", "B"], hasAccidental: false },
  { id: "F-major", label: "F", root: "F", quality: "major", notes: ["F", "A", "C"], hasAccidental: false },
  { id: "G-major", label: "G", root: "G", quality: "major", notes: ["G", "B", "D"], hasAccidental: false },
  { id: "A-major", label: "A", root: "A", quality: "major", notes: ["A", "C#", "E"], hasAccidental: false },
  { id: "B-major", label: "B", root: "B", quality: "major", notes: ["B", "D#", "F#"], hasAccidental: false },

  { id: "C-minor", label: "Cm", root: "C", quality: "minor", notes: ["C", "D#", "G"], hasAccidental: false },
  { id: "D-minor", label: "Dm", root: "D", quality: "minor", notes: ["D", "F", "A"], hasAccidental: false },
  { id: "E-minor", label: "Em", root: "E", quality: "minor", notes: ["E", "G", "B"], hasAccidental: false },
  { id: "F-minor", label: "Fm", root: "F", quality: "minor", notes: ["F", "G#", "C"], hasAccidental: false },
  { id: "G-minor", label: "Gm", root: "G", quality: "minor", notes: ["G", "A#", "D"], hasAccidental: false },
  { id: "A-minor", label: "Am", root: "A", quality: "minor", notes: ["A", "C", "E"], hasAccidental: false },
  { id: "B-minor", label: "Bm", root: "B", quality: "minor", notes: ["B", "D", "F#"], hasAccidental: false },

  { id: "C#-major", label: "C#", root: "C#", quality: "major", notes: ["C#", "F", "G#"], hasAccidental: true },
  { id: "D#-major", label: "D#", root: "D#", quality: "major", notes: ["D#", "G", "A#"], hasAccidental: true },
  { id: "F#-major", label: "F#", root: "F#", quality: "major", notes: ["F#", "A#", "C#"], hasAccidental: true },
  { id: "G#-major", label: "G#", root: "G#", quality: "major", notes: ["G#", "C", "D#"], hasAccidental: true },
  { id: "A#-major", label: "A#", root: "A#", quality: "major", notes: ["A#", "D", "F"], hasAccidental: true },

  { id: "C#-minor", label: "C#m", root: "C#", quality: "minor", notes: ["C#", "E", "G#"], hasAccidental: true },
  { id: "D#-minor", label: "D#m", root: "D#", quality: "minor", notes: ["D#", "F#", "A#"], hasAccidental: true },
  { id: "F#-minor", label: "F#m", root: "F#", quality: "minor", notes: ["F#", "A", "C#"], hasAccidental: true },
  { id: "G#-minor", label: "G#m", root: "G#", quality: "minor", notes: ["G#", "B", "D#"], hasAccidental: true },
  { id: "A#-minor", label: "A#m", root: "A#", quality: "minor", notes: ["A#", "C#", "F"], hasAccidental: true },
];