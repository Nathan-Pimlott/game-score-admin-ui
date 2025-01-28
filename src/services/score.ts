import { IScore, IScoreToCreate } from "../types";
import { del, get, post } from "../utils/request";

export async function getScores(
  pageNumber: number,
  rowsPerPage: number,
): Promise<IScore[]> {
  try {
    const scoreRes = await get(
      `/scores?limit=${rowsPerPage}&offset=${pageNumber * rowsPerPage}`,
    );

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

export async function deleteScore(id: string): Promise<boolean> {
  try {
    const deleteScoreRes = await del(`/score/${id}`);

    if (!deleteScoreRes.error) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function getScoreCount(): Promise<number> {
  try {
    const countRes = await get("/score/count");

    if (!countRes.error) {
      return countRes.data.count;
    }

    return 0;
  } catch (error) {
    return 0;
  }
}
