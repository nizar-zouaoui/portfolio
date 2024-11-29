import { CategoryRouteTypes } from "@nizar-repo/categories-types";
import ApiSDK from "@nizar-repo/server-sdk";
import ServerSDK from "@nizar-repo/server-sdk/sdk";

const isClientRequest = typeof window !== "undefined";

const suffix = "/v1/categories";
// eslint-disable-next-line @typescript-eslint/naming-convention
const _baseUrl = !isClientRequest
  ? `http://categories:3000/api${suffix}`
  : `/api${suffix}`;

let baseUrl = "";

export class CategoriesSDK extends ServerSDK {
  constructor(api: ApiSDK) {
    super(api);
    if (api.baseURL.force) baseUrl = api.baseURL.hostname + suffix;
    else {
      baseUrl = _baseUrl;
    }
  }

  async getAllCategoriesTitles() {
    const response = await this.api.get<
      CategoryRouteTypes["/categories/all-titles"]["GET"]["response"]
    >(`${baseUrl}/categories/all-titles`);
    return response.data;
  }
  async getCategoriesPaginated({
    query,
  }: {
    query: CategoryRouteTypes["/categories/"]["GET"]["query"];
  }) {
    const response = await this.api.get<
      CategoryRouteTypes["/categories/"]["GET"]["response"]
    >(`${baseUrl}/categories`, { params: query });
    return response.data;
  }

  async getCategoryById({
    params,
  }: {
    params: CategoryRouteTypes["/categories/:id"]["GET"]["params"];
  }) {
    const response = await this.api.get<
      CategoryRouteTypes["/categories/:id"]["GET"]["response"]
    >(`${baseUrl}/categories/${params.id}`);
    return response.data;
  }

  async addCategory({
    body,
  }: {
    body: CategoryRouteTypes["/categories/"]["POST"]["body"];
  }) {
    return this.api.post<
      CategoryRouteTypes["/categories/"]["POST"]["response"]
    >(`${baseUrl}/categories`, body);
  }

  async updateCategory({
    params,
    body,
  }: {
    params: CategoryRouteTypes["/categories/:id"]["PATCH"]["params"];
    body: CategoryRouteTypes["/categories/:id"]["PATCH"]["body"];
  }) {
    const response = await this.api.patch<
      CategoryRouteTypes["/categories/:id"]["PATCH"]["response"]
    >(`${baseUrl}/categories/${params.id}`, body);
    return response.data;
  }

  async deleteCategory({
    params,
  }: {
    params: CategoryRouteTypes["/categories/:id"]["DELETE"]["params"];
  }) {
    const response = await this.api.delete<
      CategoryRouteTypes["/categories/:id"]["DELETE"]["response"]
    >(`${baseUrl}/categories/${params.id}`);
    return response.data;
  }

  async addCategoryBulk({
    body,
  }: {
    body: CategoryRouteTypes["/categories/bulk"]["POST"]["body"];
  }) {
    const response = await this.api.post<
      CategoryRouteTypes["/categories/bulk"]["POST"]["response"]
    >(`${baseUrl}/categories/bulk`, body);
    return response.data;
  }
}
