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
  thoughts?: IThought[];
}

export type IScoreToCreate = Omit<IScore, "id"> & {
  playedPlatforms: string[];
  genres: string[];
};

export type IScoreToUpdate = IScore & {
  playedPlatforms: string[];
  genres: string[];
};

export interface IGenre {
  id: string;
  name: string;
  featuredScores?: IScoreCompact[];
  scoreCount?: number;
}

export interface IPlatform {
  id: string;
  name: Platform;
  featuredScores?: IScoreCompact[];
  scoreCount?: number;
}

export interface IThought {
  id: string;
  priority: number;
  title: string;
  body: string;
}

export type IThoughtToCreate = Omit<IThought, "id"> & {
  scoreId: string;
};
