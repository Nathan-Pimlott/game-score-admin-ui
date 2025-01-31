import moment from "moment";
import { IScoreToCreate, IScoreToUpdate } from "../types";

export function formatScoreToCreate(data: any): IScoreToCreate {
  return {
    ...data,
    finishDate: moment(data.finishDate).format("YYYY-MM-DD"),
    timeToComplete: parseInt(data.timeToComplete),
  };
}

export function formatScoreToUpdate(data: any): IScoreToUpdate {
  return {
    ...data,
    finishDate: moment(data.finishDate).format("YYYY-MM-DD"),
    timeToComplete: parseInt(data.timeToComplete),
  };
}
