import { AuthSDK } from "@nizar-repo/auth-sdk";
import ApiSDK from "@nizar-repo/server-sdk";
import { getCookie } from "../contexts/AuthContext/session-management";

const mainApi = new ApiSDK().setBearerToken(getCookie("AUTH_SESSION"));
const authSDK = new AuthSDK(mainApi);
const Api = {
  authSDK,
};
export default Api;
