import { IPlatform, IPlatformToCreate } from "../types";
import { del, get, post, put } from "../utils/request";

export async function getPlatforms(
  pageNumber: number = 0,
  rowsPerPage: number = 100,
): Promise<IPlatform[]> {
  try {
    const platformRes = await get(
      `/platforms?limit=${rowsPerPage}&offset=${pageNumber * rowsPerPage}`,
    );

    if (!platformRes.error) {
      return platformRes.data.platforms as IPlatform[];
    }

    return [];
  } catch (error) {
    return [];
  }
}

export async function getPlatform(id: string): Promise<IPlatform | false> {
  try {
    const platformRes = await get(`/platform/${id}`);

    if (platformRes.error) {
      throw Error("Error getting platforms. Please try again later.");
    }

    return platformRes.data.platform as IPlatform;
  } catch (error) {
    return false;
  }
}

export async function deletePlatform(id: string): Promise<boolean> {
  try {
    const deletePlatformRes = await del(`/platform/${id}`);

    if (!deletePlatformRes.error) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function getPlatformCount(): Promise<number> {
  try {
    const countRes = await get("/platform/count");

    if (!countRes.error) {
      return countRes.data.count;
    }

    return 0;
  } catch (error) {
    return 0;
  }
}

export async function createPlatform(
  platform: IPlatformToCreate,
): Promise<string | false> {
  try {
    const createPlatformRes = await post("/platform", platform);

    if (!createPlatformRes.error) {
      return createPlatformRes.data.id;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export async function updatePlatform(platform: IPlatform): Promise<boolean> {
  try {
    const updatePlatformRes = await put("/platform", platform);

    if (!updatePlatformRes.error) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
