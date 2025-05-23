import axios, { AxiosInstance } from "axios";
import { ZhonyaParams } from "../../config";
import { ZhonyaError } from "../../errors/ZhonyaError";
import { FreeWeekDto, GetFreeWeekResponse } from "./types";

export class FreeWeekService {
  private readonly httpClient: AxiosInstance;
  private readonly config: ZhonyaParams;

  constructor(config: ZhonyaParams) {
    this.config = config;

    const client = axios.create({
      baseURL: `https://${config.platformRouting}.api.riotgames.com`,
      headers: {
        "X-Riot-Token": config.riotApiKey,
      },
    });

    this.httpClient = client;
  }

  async getFreeWeekChampions(): Promise<FreeWeekDto> {
    try {
      const response = await this.httpClient.get(
        `/lol/platform/v3/champion-rotations`
      );

      const responseData = response.data as GetFreeWeekResponse;

      return responseData;
    } catch (error) {
      throw new ZhonyaError("Failed to fetch free week champions", error);
    }
  }
}
