import axios, { AxiosInstance } from "axios";
import StatusCodes from "./StatusCodes";
export type TBaseUrl =
  | {
      hostname: string;
      force: true;
    }
  | {
      hostname?: string;
      force: false;
    };
type ResetTokenCallback = (
  setBearerToken: (token: string | null) => ServerSDK,
  refreshToken?: string
) => void;

const isClientRequest = typeof window !== "undefined";

const DEFAULT_BASE_URL = {
  hostname: isClientRequest ? "/api" : "https://localhost:3000/api",
  force: false,
};

if (process.env.NODE_ENV !== "production") DEFAULT_BASE_URL.force = true;

export type ApiSDK = {};

class ServerSDK {
  public api: AxiosInstance;
  public baseURL: TBaseUrl;
  // public refreshToken: string | null = null;
  // public resetTokensCallbacks: ResetTokenCallback[] = [];
  constructor(
    baseURL: TBaseUrl = DEFAULT_BASE_URL
    // accessToken?: string,
    // refreshToken?: string
  ) {
    this.baseURL = baseURL;
    this.api = axios.create();
    // this.initOrReInit(accessToken, refreshToken);
  }
  // initOrReInit(accessToken?: string, refreshToken?: string) {
  //   if (accessToken) this.setBearerToken(accessToken);
  //   // if (refreshToken) this.refreshToken = refreshToken;
  //   // this.resetTokensCallbacks.forEach((cb) =>
  //   //   cb(this.setBearerToken, refreshToken)
  //   // );
  //   this.api.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const request = error.config;

  //       if (
  //         !request.url.includes("/z/refresh-token") &&
  //         error.response?.status === StatusCodes.Forbidden &&
  //         error.response.data.message === "Token invalid or expired" &&
  //         !request._retry
  //       ) {
  //         request._retry = true;
  //         await this.refreshUserToken();
  //         request.headers.Authorization =
  //           this.api.defaults.headers.common.Authorization;

  //         return this.api(request);
  //       }

  //       return Promise.reject(error);
  //     }
  //   );
  // }
  // async refreshUserToken() {
  //   if (!this.refreshToken) throw new Error("No refresh token");
  //   const { data } = await this.api.get<string>("/v1/auth/refresh-token", {
  //     headers: { Authorization: `Bearer ${this.refreshToken}` },
  //   });

  //   this.setBearerToken(data);
  // }
  // public setBearerToken(token: string | null) {
  //   if (token)
  //     this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   else delete this.api.defaults.headers.common.Authorization;

  //   return this;
  // }
}

export default ServerSDK;
