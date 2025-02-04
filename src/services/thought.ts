import { IThought, IThoughtToCreate } from "../types";
import { del, get, post, put } from "../utils/request";

export async function getThoughts(scoreId: string): Promise<IThought[]> {
  try {
    const thoughtRes = await get(`/thoughts/${scoreId}`);

    if (!thoughtRes.error) {
      return thoughtRes.data.thoughts as IThought[];
    }

    return [];
  } catch (error) {
    return [];
  }
}

export async function createThought(
  thought: IThoughtToCreate,
): Promise<string | false> {
  try {
    const createThoughtRes = await post("/thought", thought);

    if (!createThoughtRes.error) {
      return createThoughtRes.data.id;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function deleteThought(id: string): Promise<boolean> {
  try {
    const deleteThoughtRes = await del(`/thought/${id}`);

    if (!deleteThoughtRes.error) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function updateThought(thought: IThought): Promise<boolean> {
  try {
    const updateThoughtRes = await put("/thought", thought);

    if (!updateThoughtRes.error) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
