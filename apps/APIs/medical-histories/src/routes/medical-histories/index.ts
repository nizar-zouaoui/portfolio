import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";
import * as medicalHistoriesController from "controllers/medical-histories";
import { router } from "init";
// import * as actsValidator from "validators/medical-histories";

const BASE_ROUTE = "/medical-histories";

router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.MEDICAL_HISTORIES),
  // ...actsValidator.getMedicalHistoryDataByIdValidator,
  // actsValidator.getMedicalHistoryDataByIdValidation,
  medicalHistoriesController.getMedicalHistoryDataById
);
router.post(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.MEDICAL_HISTORIES),
  medicalHistoriesController.addMedicalHistoryData
);

router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.MEDICAL_HISTORIES),
  // ...actsValidator.deleteMedicalHistoryDataValidator,
  // actsValidator.deleteMedicalHistoryDataValidation,
  medicalHistoriesController.deleteMedicalHistoryData
);
export default router;
