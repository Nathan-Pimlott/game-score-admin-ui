import { IScore, IScoreToCreate } from "../types";
import { get, post } from "../utils/request";

export async function getScores(): Promise<IScore[]> {
  try {
    const scoreRes = await get("/scores");

    if (!scoreRes.error) {
      return scoreRes.data.scores as IScore[];
    }

    return [];
  } catch (error) {
    return [];
  }
}

export async function getScore(id: string): Promise<IScore | false> {
  try {
    const scoreRes = await get(`/score/${id}`);

    if (!scoreRes.error) {
      return scoreRes.data.score;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function getScoresBySearch(searchText: string): Promise<IScore[]> {
  try {
    const scoreRes = await get(`/search?searchText=${encodeURI(searchText)}`);

    if (!scoreRes.error) {
      return scoreRes.data.scores;
    }

    return [];
  } catch (error) {
    return [];
  }
}

export async function createScore(score: IScoreToCreate): Promise<boolean> {
  try {
    const createScoreRes = await post("/score", { body: score });

    if (!createScoreRes.error) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
