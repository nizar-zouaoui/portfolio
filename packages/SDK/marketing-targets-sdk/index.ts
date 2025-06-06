import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import ServerSDK from "@nizar-repo/server-sdk/sdk";
import ApiSDK from "@nizar-repo/server-sdk";

const isClientRequest = typeof window !== "undefined";

const suffix = "/v1/marketing-targets";
// eslint-disable-next-line @typescript-eslint/naming-convention
const _baseUrl = !isClientRequest
  ? `http://marketing-targets:3000/api${suffix}`
  : `/api${suffix}`;

let baseUrl = "";

export class MarketingTargetsSDK extends ServerSDK {
  constructor(api: ApiSDK) {
    super(api);
    if (api.baseURL.force) baseUrl = api.baseURL.hostname + suffix;
    else {
      baseUrl = _baseUrl;
    }
  }

  async getMarketingTargetData({
    query,
  }: {
    query: MarketingTargetRouteTypes["/marketing-targets/"]["GET"]["query"];
  }) {
    const response = await this.api.get<
      MarketingTargetRouteTypes["/marketing-targets/"]["GET"]["response"]
    >(`${baseUrl}/marketing-targets`, { params: query });
    return response.data;
  }

  async getMarketingTargetDataById({
    params,
  }: {
    params: MarketingTargetRouteTypes["/marketing-targets/:id"]["GET"]["params"];
  }) {
    const response = await this.api.get<
      MarketingTargetRouteTypes["/marketing-targets/:id"]["GET"]["response"]
    >(`${baseUrl}/marketing-targets/${params.id}`);
    return response.data;
  }

  async addMarketingTargetData({
    body,
  }: {
    body: MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["body"];
  }) {
    return this.api.post<
      MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["response"]
    >(`${baseUrl}/marketing-targets`, body);
  }

  async updateMarketingTargetData({
    params,
    body,
  }: {
    params: MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["params"];
    body: MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["body"];
  }) {
    const response = await this.api.patch<
      MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["response"]
    >(`${baseUrl}/marketing-targets/${params.id}`, body);
    return response.data;
  }

  async deleteMarketingTargetData({
    params,
  }: {
    params: MarketingTargetRouteTypes["/marketing-targets/:id"]["DELETE"]["params"];
  }) {
    const response = await this.api.delete<
      MarketingTargetRouteTypes["/marketing-targets/:id"]["DELETE"]["response"]
    >(`${baseUrl}/marketing-targets/${params.id}`);
    return response.data;
  }

  async addMarketingTargetDataBulk({
    body,
  }: {
    body: MarketingTargetRouteTypes["/marketing-targets/bulk"]["POST"]["body"];
  }) {
    const response = await this.api.post<
      MarketingTargetRouteTypes["/marketing-targets/bulk"]["POST"]["response"]
    >(`${baseUrl}/marketing-targets/bulk`, body);
    return response.data;
  }
}
