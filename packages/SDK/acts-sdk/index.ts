import { ActRouteTypes } from "@nizar-repo/acts-types";
import ApiSDK from "@nizar-repo/server-sdk";
import ServerSDK from "@nizar-repo/server-sdk/sdk";

const isClientRequest = typeof window !== "undefined";

const suffix = "/v1/acts";
// eslint-disable-next-line @typescript-eslint/naming-convention
const _baseUrl = !isClientRequest
  ? `http://acts:3000/api${suffix}`
  : `/api${suffix}`;

let baseUrl = "";

export class ActsSDK extends ServerSDK {
  constructor(api: ApiSDK) {
    super(api);
    if (api.baseURL.force) baseUrl = api.baseURL.hostname + suffix;
    else {
      baseUrl = _baseUrl;
    }
  }

  async getActData({
    query,
  }: {
    query: ActRouteTypes["/acts/"]["GET"]["query"];
  }) {
    const response = await this.api.get<
      ActRouteTypes["/acts/"]["GET"]["response"]
    >(`${baseUrl}/acts`, { params: query });
    return response.data;
  }

  async getActDataById({
    params,
  }: {
    params: ActRouteTypes["/acts/:id"]["GET"]["params"];
  }) {
    const response = await this.api.get<
      ActRouteTypes["/acts/:id"]["GET"]["response"]
    >(`${baseUrl}/acts/${params.id}`);
    return response.data;
  }

  async addActData({
    body,
  }: {
    body: ActRouteTypes["/acts/"]["POST"]["body"];
  }) {
    return this.api.post<ActRouteTypes["/acts/"]["POST"]["response"]>(
      `${baseUrl}/acts`,
      body
    );
  }

  async updateActData({
    params,
    body,
  }: {
    params: ActRouteTypes["/acts/:id"]["PATCH"]["params"];
    body: ActRouteTypes["/acts/:id"]["PATCH"]["body"];
  }) {
    const response = await this.api.patch<
      ActRouteTypes["/acts/:id"]["PATCH"]["response"]
    >(`${baseUrl}/acts/${params.id}`, body);
    return response.data;
  }

  async deleteActData({
    params,
  }: {
    params: ActRouteTypes["/acts/:id"]["DELETE"]["params"];
  }) {
    const response = await this.api.delete<
      ActRouteTypes["/acts/:id"]["DELETE"]["response"]
    >(`${baseUrl}/acts/${params.id}`);
    return response.data;
  }
}
