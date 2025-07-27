import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";
import * as medicalHistoriesController from "controllers/medical-histories";
import { router } from "init";
import * as medicalHistoriesValidator from "validators/medical-histories";

const BASE_ROUTE = "/medical-histories";

router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.MEDICAL_HISTORIES),
  ...medicalHistoriesValidator.getMedicalHistoryDataByIdValidator,
  medicalHistoriesValidator.getMedicalHistoryDataByIdValidation,
  medicalHistoriesController.getMedicalHistoryDataById
);
router.post(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.MEDICAL_HISTORIES),
  ...medicalHistoriesValidator.addMedicalHistoryDataValidator,
  medicalHistoriesValidator.addMedicalHistoryDataValidation,
  medicalHistoriesController.addMedicalHistoryData
);

router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.MEDICAL_HISTORIES),
  ...medicalHistoriesValidator.deleteMedicalHistoryDataValidator,
  medicalHistoriesValidator.deleteMedicalHistoryDataValidation,
  medicalHistoriesController.deleteMedicalHistoryData
);
export default router;
