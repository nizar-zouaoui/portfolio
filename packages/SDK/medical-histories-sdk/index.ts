import {
  ActRouteTypes,
  MedicalHistoryRouteTypes,
} from "@nizar-repo/medical-histories-types";
import ApiSDK from "@nizar-repo/server-sdk";
import ServerSDK from "@nizar-repo/server-sdk/sdk";

const isClientRequest = typeof window !== "undefined";

const suffix = "/v1/medical-histories";
// eslint-disable-next-line @typescript-eslint/naming-convention
const _baseUrl = !isClientRequest
  ? `http://medical-histories:3000/api${suffix}`
  : `/api${suffix}`;

let baseUrl = "";

export class MedicalHistoriesSDK extends ServerSDK {
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

  async getMedicalHistoryData({
    params,
    query,
  }: {
    params: MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["params"];
    query: MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["query"];
  }) {
    const response = await this.api.get<
      MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["response"]
    >(`${baseUrl}/medical-histories/${params.id}`, { params: query });
    return response.data;
  }

  async addMedicalHistoryData({
    body,
  }: {
    body: MedicalHistoryRouteTypes["/medical-histories/"]["POST"]["body"];
  }) {
    return this.api.post<
      MedicalHistoryRouteTypes["/medical-histories/"]["POST"]["response"]
    >(`${baseUrl}/medical-histories`, body);
  }

  async updateMedicalHistoryData({
    params,
    body,
  }: {
    params: MedicalHistoryRouteTypes["/medical-histories/:id"]["PATCH"]["params"];
    body: MedicalHistoryRouteTypes["/medical-histories/:id"]["PATCH"]["body"];
  }) {
    const response = await this.api.patch<
      MedicalHistoryRouteTypes["/medical-histories/:id"]["PATCH"]["response"]
    >(`${baseUrl}/medical-histories/${params.id}`, body);
    return response.data;
  }

  async deleteMedicalHistoryData({
    params,
  }: {
    params: MedicalHistoryRouteTypes["/medical-histories/:id"]["DELETE"]["params"];
  }) {
    const response = await this.api.delete<
      MedicalHistoryRouteTypes["/medical-histories/:id"]["DELETE"]["response"]
    >(`${baseUrl}/medical-histories/${params.id}`);
    return response.data;
  }
}
