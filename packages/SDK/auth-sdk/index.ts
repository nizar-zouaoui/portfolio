import {
  AuthRouteTypes,
  RoleRouteTypes,
  UserRouteTypes,
} from "@nizar-repo/auth-types";
import axios, { Axios, AxiosRequestConfig } from "axios";

export class AuthSDK {
  api: Axios;

  constructor(prefix: string) {
    const token = localStorage.getItem("token");
    this.api = axios.create({
      baseURL: `${prefix}api/v1/auth/`,
      headers: {
        Authorization: token,
      },
    });
  }

  async classicSignIn({
    body,
  }: {
    body: AuthRouteTypes["/auth/classic/login/"]["POST"]["body"];
  }) {
    const { data } = await this.api.post<
      AuthRouteTypes["/auth/classic/login/"]["POST"]["response"]
    >(`/auth/classic/login`, body);
    return data;
  }

  async classicSignUp({
    body,
  }: {
    body: AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["body"];
  }) {
    const { data } = await this.api.post<
      AuthRouteTypes["/auth/classic/sign-up/"]["POST"]["response"]
    >(`/auth/classic/sign-up`, body);
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
    >(`/roles`, body);
    return data;
  }

  async getRole({
    params,
  }: {
    params: RoleRouteTypes["/roles/:id"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      RoleRouteTypes["/roles/:id"]["GET"]["response"]
    >(`/roles/${params.id}`);
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
    >(`/roles/${params.id}`, body);
    return data;
  }

  async deleteRole({
    params,
  }: {
    params: RoleRouteTypes["/roles/:id"]["DELETE"]["params"];
  }) {
    const { data } = await this.api.delete<
      RoleRouteTypes["/roles/:id"]["DELETE"]["response"]
    >(`/roles/${params.id}`);
    return data;
  }

  async assignRole({
    body,
  }: {
    body: RoleRouteTypes["/roles/assign-role"]["POST"]["body"];
  }) {
    const { data } = await this.api.post<
      RoleRouteTypes["/roles/assign-role"]["POST"]["response"]
    >(`/roles`, body);
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
    >(`/users`, body);
    return data;
  }

  async getUser({
    params,
  }: {
    params: UserRouteTypes["/users/:id"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      UserRouteTypes["/users/:id"]["GET"]["response"]
    >(`/users/${params.id}`);
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
    >(`/users/${params.id}`, body);
    return data;
  }

  async deleteUser({
    params,
  }: {
    params: UserRouteTypes["/users/:id"]["DELETE"]["params"];
  }) {
    const { data } = await this.api.delete<
      UserRouteTypes["/users/:id"]["DELETE"]["response"]
    >(`/users/${params.id}`);
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
    >(`/users/me`, body);
    return data;
  }
}
