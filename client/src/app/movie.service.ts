import axios from "axios";
import { ApiRequest, ApiResponse } from "../../../models";

export class MovieService {
  private _getHttpQuery(request: ApiRequest): string {
    const params: Record<string, unknown> = { ...request };
    const query: Record<string, string> = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        query[key] = `${params[key]}`;
      }
    });
    return new URLSearchParams(params as Record<string, string>).toString();
  }

  public async search(request: ApiRequest): Promise<ApiResponse | undefined> {
    try {
      const url = `http://localhost:4000?${this._getHttpQuery(request)}`;
      console.log(url);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
