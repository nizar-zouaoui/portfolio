import {
  AuthRouteTypes,
  RoleRouteTypes,
  UserRouteTypes,
} from "@nizar-repo/auth-types";
import axios, { Axios, AxiosRequestConfig } from "axios";
import ServerSDK from "@nizar-repo/server-sdk/sdk";
import ApiSDK from "@nizar-repo/server-sdk";

const isClientRequest = typeof window !== "undefined";

const suffix = "/v1/auth";
// eslint-disable-next-line @typescript-eslint/naming-convention
const _baseUrl = !isClientRequest
  ? `http://auth:3000/api${suffix}`
  : `/api${suffix}`;

let baseUrl = "";

export class AuthSDK extends ServerSDK {
  constructor(api: ApiSDK) {
    super(api);
    if (api.baseURL.force) baseUrl = api.baseURL.hostname + suffix;
    else {
      baseUrl = _baseUrl;
    }
  }
  private handleAuthResponse(token: { accessToken: string }) {
    this.setBearerToken(token.accessToken);
  }

  async classicSignIn({
    body,
  }: {
    body: AuthRouteTypes["/auth/classic/login/"]["POST"]["body"];
  }) {
    const { data } = await this.api.post<
      AuthRouteTypes["/auth/classic/login/"]["POST"]["response"]
    >(`${baseUrl}/auth/classic/login`, body);
    this.handleAuthResponse(data);
    return data;
  }

  async classicSignUp({
    body,
  }: {
    body: AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"];
  }) {
    const { data } = await this.api.post<
      AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["response"]
    >(`${baseUrl}/auth/classic/sign-up`, body);
    this.handleAuthResponse(data);
    return data;
  }

  async refreshAccessToken() {
    const { data } = await this.api.get<
      AuthRouteTypes["/auth/refresh-access-token/"]["GET"]["response"]
    >(`${baseUrl}/auth/refresh-access-token`);
    this.handleAuthResponse(data);
    return data;
  }

  async getRoles() {
    const { data } =
      await this.api.get<RoleRouteTypes["/roles/"]["GET"]["response"]>(
        `/roles`
      );
    return data;
  }

  async createRole({
    body,
  }: {
    body: RoleRouteTypes["/roles/"]["POST"]["body"];
  }) {
    const { data } = await this.api.post<
      RoleRouteTypes["/roles/"]["POST"]["response"]
    >(`${baseUrl}/roles`, body);
    return data;
  }

  async getRole({
    params,
  }: {
    params: RoleRouteTypes["/roles/:id"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      RoleRouteTypes["/roles/:id"]["GET"]["response"]
    >(`${baseUrl}/roles/${params.id}`);
    return data;
  }

  async editRole({
    body,
    params,
  }: {
    body: RoleRouteTypes["/roles/:id"]["PATCH"]["body"];
    params: RoleRouteTypes["/roles/:id"]["PATCH"]["params"];
  }) {
    const { data } = await this.api.patch<
      RoleRouteTypes["/roles/:id"]["PATCH"]["response"]
    >(`${baseUrl}/roles/${params.id}`, body);
    return data;
  }

  async deleteRole({
    params,
  }: {
    params: RoleRouteTypes["/roles/:id"]["DELETE"]["params"];
  }) {
    const { data } = await this.api.delete<
      RoleRouteTypes["/roles/:id"]["DELETE"]["response"]
    >(`${baseUrl}/roles/${params.id}`);
    return data;
  }

  async assignRole({
    body,
  }: {
    body: RoleRouteTypes["/roles/assign-role"]["POST"]["body"];
  }) {
    const { data } = await this.api.post<
      RoleRouteTypes["/roles/assign-role"]["POST"]["response"]
    >(`${baseUrl}/roles`, body);
    return data;
  }

  async getUsers() {
    const { data } =
      await this.api.get<UserRouteTypes["/users/"]["GET"]["response"]>(
        `/users`
      );
    return data;
  }

  async createUser({
    body,
  }: {
    body: UserRouteTypes["/users/"]["POST"]["body"];
  }) {
    const { data } = await this.api.post<
      UserRouteTypes["/users/"]["POST"]["response"]
    >(`${baseUrl}/users`, body);
    return data;
  }

  async getUser({
    params,
  }: {
    params: UserRouteTypes["/users/:id"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      UserRouteTypes["/users/:id"]["GET"]["response"]
    >(`${baseUrl}/users/${params.id}`);
    return data;
  }

  async editUser({
    body,
    params,
  }: {
    body: UserRouteTypes["/users/:id"]["PATCH"]["body"];
    params: UserRouteTypes["/users/:id"]["PATCH"]["params"];
  }) {
    const { data } = await this.api.patch<
      UserRouteTypes["/users/:id"]["PATCH"]["response"]
    >(`${baseUrl}/users/${params.id}`, body);
    return data;
  }

  async deleteUser({
    params,
  }: {
    params: UserRouteTypes["/users/:id"]["DELETE"]["params"];
  }) {
    const { data } = await this.api.delete<
      UserRouteTypes["/users/:id"]["DELETE"]["response"]
    >(`${baseUrl}/users/${params.id}`);
    return data;
  }

  async getMe() {
    const { data } =
      await this.api.get<UserRouteTypes["/users/me"]["GET"]["response"]>(
        `/users/`
      );
    return data;
  }

  async editMe({
    body,
  }: {
    body: UserRouteTypes["/users/me"]["PATCH"]["body"];
  }) {
    const { data } = await this.api.patch<
      UserRouteTypes["/users/me"]["PATCH"]["response"]
    >(`${baseUrl}/users/me`, body);
    return data;
  }
}
