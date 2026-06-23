export type ChordQuality = "major" | "minor";

export type GameStatus =
  | "home"
  | "config"
  | "countdown"
  | "playing"
  | "success"
  | "failure"
  | "result"
  | "history";

export type GameConfig = {
  totalChords: 10 | 20 | 50;
  includeMajor: boolean;
  includeMinor: boolean;
  includeAccidentals: boolean;
};

export type Chord = {
  id: string;
  label: string;
  root: string;
  quality: ChordQuality;
  notes: string[];
  hasAccidental: boolean;
};

export type SessionResult = {
  date: string;
  totalChords: number;
  totalTimeMs: number;
  averageTimeMs: number;
};