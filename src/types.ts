export type Platform = "Switch" | "Steam" | "DS" | "PS4" | "Gameboy";

export interface IScoreCompact {
  id: string;
  name: string;
  score: number;
  finishDate: string;
  timeToComplete: number;
}

export interface IScore extends IScoreCompact {
  playedPlatforms?: IPlatform[];
  genres?: IGenre[];
  thoughts?: IThoughts[];
}

export type IScoreToCreate = Omit<IScore, "id">;

export interface IGenre {
  id: string;
  name: string;
  featuredScores?: IScoreCompact[];
}

export interface IPlatform {
  id: string;
  name: Platform;
  featuredScores?: IScoreCompact[];
}

export interface IThoughts {
  id: string;
  priority: number;
  title: string;
  body: string;
}
