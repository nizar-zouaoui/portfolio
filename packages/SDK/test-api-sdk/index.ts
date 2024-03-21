import ServerSDK, { TBaseUrl } from "@nizar-repo/server-sdk";
import { TestApiSDKTypes } from "./types/TestApiSDKTypes";
const isClientRequest = typeof window !== "undefined";

const suffix = "/v1/test-api";
// eslint-disable-next-line @typescript-eslint/naming-convention
const _baseUrl = !isClientRequest
  ? `http://test-api:3000/api${suffix}`
  : `/api${suffix}`;

let baseUrl = "";
class TestApiSDK extends ServerSDK {
  constructor(api: {
    baseURL: TBaseUrl;
    accessToken?: string;
    refreshToken?: string;
  }) {
    super(api.baseURL, api.accessToken, api.refreshToken);
    if (api.baseURL.force) baseUrl = api.baseURL.hostname + suffix;
    else {
      baseUrl = _baseUrl;
    }
  }
  public async addTestData({
    body,
  }: {
    body: TestApiSDKTypes["addTestDataBody"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      TestApiSDKTypes["addTestDataResponse"]
    >(`${baseUrl}/test-api/`, body);

    return data;
  }
  public async getTestDatas({
    query,
  }: {
    body?: never;
    query: TestApiSDKTypes["getTestDatasQuery"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      TestApiSDKTypes["getTestDatasResponse"]
    >(`${baseUrl}/test-api/`, { params: query });

    return data;
  }
  public async getTestDataById({
    params,
  }: {
    body?: never;
    query?: never;
    params: TestApiSDKTypes["getTestDataByIdParams"];
  }) {
    const { data } = await this.api.get<
      TestApiSDKTypes["getTestDataByIdResponse"]
    >(`${baseUrl}/test-api/${params.id}`);

    return data;
  }
  public async updateTestData({
    body,
    params,
  }: {
    body: TestApiSDKTypes["updateTestDataBody"];
    query?: never;
    params: TestApiSDKTypes["updateTestDataParams"];
  }) {
    const { data } = await this.api.post<
      TestApiSDKTypes["updateTestDataResponse"]
    >(`${baseUrl}/test-api/${params.id}`, body);

    return data;
  }
  public async deleteTestDataById({
    params,
  }: {
    body?: never;
    query?: never;
    params: TestApiSDKTypes["deleteTestDataByIdParams"];
  }) {
    const { data } = await this.api.delete<
      TestApiSDKTypes["deleteTestDataByIdResponse"]
    >(`${baseUrl}/test-api/${params.id}`);

    return data;
  }
}

export default TestApiSDK;
