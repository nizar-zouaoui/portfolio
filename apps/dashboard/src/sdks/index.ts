import { AuthSDK } from "@nizar-repo/auth-sdk";
import { CategoriesSDK } from "@nizar-repo/categories-sdk";
import { MarketingTargetsSDK } from "@nizar-repo/marketing-targets-sdk";
import { MedicalHistoriesSDK } from "@nizar-repo/medical-histories-sdk";
import { PatientsSDK } from "@nizar-repo/patients-sdk";
import ApiSDK from "@nizar-repo/server-sdk";
import { getCookie } from "contexts/AuthContext/session-management";

const mainApi = new ApiSDK().setBearerToken(getCookie("AUTH_SESSION"));
const authSDK = new AuthSDK(mainApi);
const marketingTargetsSDK = new MarketingTargetsSDK(mainApi);
const categoriesSDK = new CategoriesSDK(mainApi);
const patientsSDK = new PatientsSDK(mainApi);
const medicalHistoriesSDK = new MedicalHistoriesSDK(mainApi);
const Api = {
  authSDK,
  marketingTargetsSDK,
  categoriesSDK,
  patientsSDK,
  medicalHistoriesSDK,
};
export default Api;
