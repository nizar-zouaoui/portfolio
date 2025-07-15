import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";
import * as appointmentsController from "controllers/appointments";
import { router } from "init";
import * as appointmentsValidator from "validators/appointments";

const BASE_ROUTE = "/appointments";

router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.APPOINTMENTS),
  ...appointmentsValidator.getAppointmentDataByIdValidator,
  appointmentsValidator.getAppointmentDataByIdValidation,
  appointmentsController.getAppointmentDataById
);
router.post(
  `${BASE_ROUTE}/:medicalHistoryId`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.APPOINTMENTS),
  ...appointmentsValidator.addAppointmentDataValidator,
  appointmentsValidator.addAppointmentDataValidation,
  appointmentsController.addAppointmentData
);

router.patch(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.APPOINTMENTS),
  ...appointmentsValidator.updateAppointmentDataValidator,
  appointmentsValidator.updateAppointmentDataValidation,
  appointmentsController.updateAppointmentData
);
router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.APPOINTMENTS),
  ...appointmentsValidator.deleteAppointmentDataValidator,
  appointmentsValidator.deleteAppointmentDataValidation,
  appointmentsController.deleteAppointmentData
);
export default router;
