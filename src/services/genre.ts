import { IGenre, IGenreToCreate } from "../types";
import { del, get, post, put } from "../utils/request";

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

    return genreRes.data.genre as IGenre;
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

export async function createGenre(
  genre: IGenreToCreate,
): Promise<string | false> {
  try {
    const createGenreRes = await post("/genre", genre);

    if (!createGenreRes.error) {
      return createGenreRes.data.id;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function updateGenre(genre: IGenre): Promise<boolean> {
  try {
    const updateGenreRes = await put("/genre", genre);

    if (!updateGenreRes.error) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
