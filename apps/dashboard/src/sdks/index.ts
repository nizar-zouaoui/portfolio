import { AuthSDK } from "@nizar-repo/auth-sdk";
import { MarketingTargetsSDK } from "@nizar-repo/marketing-targets-sdk";
import ApiSDK from "@nizar-repo/server-sdk";
import { getCookie } from "../contexts/AuthContext/session-management";

const mainApi = new ApiSDK().setBearerToken(getCookie("AUTH_SESSION"));
const authSDK = new AuthSDK(mainApi);
const marketingTargetsSDK = new MarketingTargetsSDK(mainApi);
const Api = {
  authSDK,
  marketingTargetsSDK,
};
export default Api;
