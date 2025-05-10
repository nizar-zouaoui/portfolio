import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";
import * as patientsController from "controllers/patients";
import { router } from "init";
import * as patientsValidator from "validators/patients";

const BASE_ROUTE = "/patients";

router.get(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.PATIENTS),
  ...patientsValidator.getPatientDataValidator,
  patientsValidator.getPatientDataValidation,
  patientsController.getPatientData
);
router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.PATIENTS),
  ...patientsValidator.getPatientDataByIdValidator,
  patientsValidator.getPatientDataByIdValidation,
  patientsController.getPatientDataById
);
router.post(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.PATIENTS),
  ...patientsValidator.addPatientDataValidator,
  patientsValidator.addPatientDataValidation,
  patientsController.addPatientData
);

router.post(
  `${BASE_ROUTE}/bulk`,
  protectRoute(ACCESS_PRIVILEGE.WRITE_ALL, RESOURCE.PATIENTS),
  ...patientsValidator.addPatientDataBulkValidator,
  patientsValidator.addPatientDataBulkValidation,
  patientsController.addPatientDataBulk
);
router.patch(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.PATIENTS),
  ...patientsValidator.updatePatientDataValidator,
  patientsValidator.updatePatientDataValidation,
  patientsController.updatePatientData
);
router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.PATIENTS),
  ...patientsValidator.deletePatientDataValidator,
  patientsValidator.deletePatientDataValidation,
  patientsController.deletePatientData
);
export default router;
