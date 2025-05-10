import { PatientRouteTypes } from "@nizar-repo/patients-types";
import ApiSDK from "@nizar-repo/server-sdk";
import ServerSDK from "@nizar-repo/server-sdk/sdk";

const isClientRequest = typeof window !== "undefined";

const suffix = "/v1/patients";
// eslint-disable-next-line @typescript-eslint/naming-convention
const _baseUrl = !isClientRequest
  ? `http://patients:3000/api${suffix}`
  : `/api${suffix}`;

let baseUrl = "";

export class PatientsSDK extends ServerSDK {
  constructor(api: ApiSDK) {
    super(api);
    if (api.baseURL.force) baseUrl = api.baseURL.hostname + suffix;
    else {
      baseUrl = _baseUrl;
    }
  }

  async getPatientData({
    query,
  }: {
    query: PatientRouteTypes["/patients/"]["GET"]["query"];
  }) {
    const response = await this.api.get<
      PatientRouteTypes["/patients/"]["GET"]["response"]
    >(`${baseUrl}/patients`, { params: query });
    return response.data;
  }

  async getPatientDataById({
    params,
  }: {
    params: PatientRouteTypes["/patients/:id"]["GET"]["params"];
  }) {
    const response = await this.api.get<
      PatientRouteTypes["/patients/:id"]["GET"]["response"]
    >(`${baseUrl}/patients/${params.id}`);
    return response.data;
  }

  async addPatientData({
    body,
  }: {
    body: PatientRouteTypes["/patients/"]["POST"]["body"];
  }) {
    return this.api.post<PatientRouteTypes["/patients/"]["POST"]["response"]>(
      `${baseUrl}/patients`,
      body
    );
  }

  async updatePatientData({
    params,
    body,
  }: {
    params: PatientRouteTypes["/patients/:id"]["PATCH"]["params"];
    body: PatientRouteTypes["/patients/:id"]["PATCH"]["body"];
  }) {
    const response = await this.api.patch<
      PatientRouteTypes["/patients/:id"]["PATCH"]["response"]
    >(`${baseUrl}/patients/${params.id}`, body);
    return response.data;
  }

  async deletePatientData({
    params,
  }: {
    params: PatientRouteTypes["/patients/:id"]["DELETE"]["params"];
  }) {
    const response = await this.api.delete<
      PatientRouteTypes["/patients/:id"]["DELETE"]["response"]
    >(`${baseUrl}/patients/${params.id}`);
    return response.data;
  }

  async addPatientDataBulk({
    body,
  }: {
    body: PatientRouteTypes["/patients/bulk"]["POST"]["body"];
  }) {
    const response = await this.api.post<
      PatientRouteTypes["/patients/bulk"]["POST"]["response"]
    >(`${baseUrl}/patients/bulk`, body);
    return response.data;
  }
}
