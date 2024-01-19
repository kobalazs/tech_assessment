import axios from "axios";
import { ApiRequest, ApiResponse } from "../../../models";

export class MovieService {
  public async search(request: ApiRequest): Promise<ApiResponse | undefined> {
    try {
      const response = await axios.get("http://localhost:4000");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
