import { IGenre } from "../types";
import { get } from "../utils/request";

export async function getGenres(
  pageNumber: number = 0,
  rowsPerPage: number = 100,
): Promise<IGenre[]> {
  try {
    const genreRes = await get(
      `/genres?limit=${rowsPerPage}&offset=${pageNumber * rowsPerPage}`,
    );

    if (!genreRes.error) {
      return genreRes.data.genres as IGenre[];
    }

    return [];
  } catch (error) {
    return [];
  }
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

export async function deleteGenre(id: string): Promise<boolean> {
  try {
    const deleteGenreRes = await del(`/genre/${id}`);

    if (!deleteGenreRes.error) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function getGenreCount(): Promise<number> {
  try {
    const countRes = await get("/genre/count");

    if (!countRes.error) {
      return countRes.data.count;
    }

    return 0;
  } catch (error) {
    return 0;
  }
}
