import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";
import * as actsController from "controllers/acts";
import { router } from "init";
import * as actsValidator from "validators/acts";

const BASE_ROUTE = "/acts";

router.get(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.ACTS),
  ...actsValidator.getActDataValidator,
  actsValidator.getActDataValidation,
  actsController.getActsPaginated
);
router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.ACTS),
  ...actsValidator.getActDataByIdValidator,
  actsValidator.getActDataByIdValidation,
  actsController.getActById
);
router.post(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.ACTS),
  ...actsValidator.addActDataValidator,
  actsValidator.addActDataValidation,
  actsController.addAct
);

router.patch(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.ACTS),
  ...actsValidator.updateActDataValidator,
  actsValidator.updateActDataValidation,
  actsController.updateAct
);
router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.ACTS),
  ...actsValidator.deleteActDataValidator,
  actsValidator.deleteActDataValidation,
  actsController.deleteActData
);
export default router;
