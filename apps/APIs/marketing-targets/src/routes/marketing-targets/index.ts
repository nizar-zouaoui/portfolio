import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";
import * as marketingTargetsController from "controllers/marketing-targets";
import { router } from "init";
import * as marketingTargetsValidator from "validators/marketing-targets";

const BASE_ROUTE = "/marketing-targets";

router.get(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.getMarketingTargetDataValidator,
  marketingTargetsValidator.getMarketingTargetDataValidation,
  marketingTargetsController.getMarketingTargetData
);
router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.getMarketingTargetDataByIdValidator,
  marketingTargetsValidator.getMarketingTargetDataByIdValidation,
  marketingTargetsController.getMarketingTargetDataById
);
router.post(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.addMarketingTargetDataValidator,
  marketingTargetsValidator.addMarketingTargetDataValidation,
  marketingTargetsController.addMarketingTargetData
);

router.post(
  `${BASE_ROUTE}/bulk`,
  protectRoute(ACCESS_PRIVILEGE.WRITE_ALL, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.addMarketingTargetDataBulkValidator,
  marketingTargetsValidator.addMarketingTargetDataBulkValidation,
  marketingTargetsController.addMarketingTargetDataBulk
);
router.patch(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.updateMarketingTargetDataValidator,
  marketingTargetsValidator.updateMarketingTargetDataValidation,
  marketingTargetsController.updateMarketingTargetData
);
router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.deleteMarketingTargetDataValidator,
  marketingTargetsValidator.deleteMarketingTargetDataValidation,
  marketingTargetsController.deleteMarketingTargetData
);
export default router;
