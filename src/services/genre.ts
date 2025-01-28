import { IGenre } from "../types";
import { get } from "../utils/request";

export async function getGenres(): Promise<IGenre[]> {
  const genresRes = await get("/genres");

  if (genresRes.error) {
    throw Error("Error getting genres. Please try again later.");
  }

  return genresRes.data.genres as IGenre[];
}

export async function getGenre(id: string): Promise<IGenre | false> {
  try {
    const genreRes = await get(`/genre/${id}`);

    if (genreRes.error) {
      throw Error("Error getting genres. Please try again later.");
    }

    return genreRes.data.genres as IGenre;
  } catch (error) {
    return false;
  }
}
