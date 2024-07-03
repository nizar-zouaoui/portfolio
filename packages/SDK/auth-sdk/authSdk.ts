import axios, { Axios } from "axios";

export class AuthSDK {
  url: string;
  api: Axios;

  constructor(prefix: string) {
    this.url = `${prefix}/auth`;
    this.api = axios;
  }

  async classicSignIn({
    body,
  }: {
    body: {
      email: string;
      password: string;
    };
  }): Promise<{ accessToken: string }> {
    return this.api.post(`${this.url}/classic/login`, body);
  }

  async classicSignUp({
    body,
  }: {
    body: {
      email: string;
      password: string;
    };
  }): Promise<{ accessToken: string }> {
    return this.api.post(`${this.url}/classic/sign-up`, body);
  }
}
