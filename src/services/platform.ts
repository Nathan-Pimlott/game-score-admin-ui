import { IPlatform } from "../types";
import { get } from "../utils/request";

export async function getPlatforms(): Promise<IPlatform[]> {
  const platformsRes = await get("/platforms");

  if (platformsRes.error) {
    throw Error("Error getting platforms. Please try again later.");
  }

  return platformsRes.data.platforms as IPlatform[];
}

export async function getPlatform(id: string): Promise<IPlatform | false> {
  try {
    const platformsRes = await get(`/platform/${id}`);

    if (platformsRes.error) {
      throw Error("Error getting the platform. Please try again later.");
    }

    return platformsRes.data.platforms as IPlatform;
  } catch (error) {
    return false;
  }
}
