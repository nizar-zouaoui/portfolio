import { AuthSDK } from "@nizar-repo/auth-sdk";
import { CategoriesSDK } from "@nizar-repo/categories-sdk";
import { MarketingTargetsSDK } from "@nizar-repo/marketing-targets-sdk";
import ApiSDK from "@nizar-repo/server-sdk";
import { getCookie } from "contexts/AuthContext/session-management";

const mainApi = new ApiSDK().setBearerToken(getCookie("AUTH_SESSION"));
const authSDK = new AuthSDK(mainApi);
const marketingTargetsSDK = new MarketingTargetsSDK(mainApi);
const categoriesSDK = new CategoriesSDK(mainApi);
const Api = {
  authSDK,
  marketingTargetsSDK,
  categoriesSDK,
};
export default Api;
