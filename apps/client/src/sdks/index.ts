import { AuthSDK } from "@nizar-repo/auth-sdk";
import ApiSDK from "@nizar-repo/server-sdk";

const mainApi = new ApiSDK();
const authSDK = new AuthSDK(mainApi);
const Api = {
  authSDK,
};
export default Api;
