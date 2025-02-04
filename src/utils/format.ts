import moment from "moment";

import { IScoreToCreate, IScoreToUpdate } from "../types";

export function formatScoreToCreate(data: any): IScoreToCreate {
  return {
    name: data.name,
    score: data.score,
    playedPlatforms: data.playedPlatforms || [],
    genres: data.genres || [],
    thoughts: data.thoughts || [],
    finishDate: moment(data.finishDate).format("YYYY-MM-DD"),
    timeToComplete: parseInt(data.timeToComplete),
  };
}

export function formatScoreToUpdate(data: any): IScoreToUpdate {
  return {
    id: data.id,
    name: data.name,
    score: data.score,
    playedPlatforms: data.playedPlatforms || [],
    genres: data.genres || [],
    thoughts: data.thoughts || [],
    finishDate: moment(data.finishDate).format("YYYY-MM-DD"),
    timeToComplete: parseInt(data.timeToComplete),
  };
}
