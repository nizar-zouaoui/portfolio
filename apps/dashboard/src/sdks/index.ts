import { AuthSDK } from "@nizar-repo/auth-sdk";
import { CategoriesSDK } from "@nizar-repo/categories-sdk";
import { MarketingTargetsSDK } from "@nizar-repo/marketing-targets-sdk";
import { MedicalHistoriesSDK } from "@nizar-repo/medical-histories-sdk";
import { PatientsSDK } from "@nizar-repo/patients-sdk";
import ApiSDK from "@nizar-repo/server-sdk";
import { getCookie } from "contexts/AuthContext/session-management";

// Create the main API instance
const mainApi = new ApiSDK();

// Function to update the bearer token dynamically
export const updateApiToken = () => {
  const token = getCookie("API_TOKEN");
  if (token) {
    mainApi.setBearerToken(token);
  }
};

// Initialize with current token
updateApiToken();

// Create SDK instances
const authSDK = new AuthSDK(mainApi);
const marketingTargetsSDK = new MarketingTargetsSDK(mainApi);
const categoriesSDK = new CategoriesSDK(mainApi);
const patientsSDK = new PatientsSDK(mainApi);
const medicalHistoriesSDK = new MedicalHistoriesSDK(mainApi);

const Api = {
  mainApi,
  authSDK,
  marketingTargetsSDK,
  categoriesSDK,
  patientsSDK,
  medicalHistoriesSDK,
  updateApiToken, // Export the update function
};

export default Api;
