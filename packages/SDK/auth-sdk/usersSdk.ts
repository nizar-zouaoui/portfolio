import axios, { Axios, AxiosRequestHeaders } from "axios";

export class UsersSDK {
  url: string;
  api: Axios;

  constructor(prefix: string) {
    this.url = `${prefix}/users`;
    this.api = axios;
  }

  async getUsers({
    headers,
  }: {
    headers: AxiosRequestHeaders;
  }): Promise<{ accessToken: string }> {
    return this.api.get(this.url, {
      headers,
    });
  }

  async getMyUser({
    headers,
  }: {
    headers: AxiosRequestHeaders;
  }): Promise<{ accessToken: string }> {
    return this.api.get(`${this.url}/me`, {
      headers,
    });
  }
}
