import moment from "moment";
import { IScoreToCreate } from "../types";

export function formatScoreToCreate(data: any): IScoreToCreate {
  return {
    ...data,
    finishDate: moment(data.finishDate).format("YYYY-MM-DD"),
    timeToComplete: parseInt(data.timeToComplete),
  };
}
