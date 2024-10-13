import * as marketingTargetsController from "../../controllers/marketing-targets-controller";
import * as marketingTargetsValidator from "../../validators/marketing-targets-validator";
import { router } from "../../init";
import { protectRoute } from "@nizar-repo/route-protection";
import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";

router.get(
  "/",
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.getMarketingTargetDataValidator,
  marketingTargetsValidator.getMarketingTargetDataValidation,
  marketingTargetsController.getMarketingTargetData
);
router.get(
  "/:id",
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.getMarketingTargetDataByIdValidator,
  marketingTargetsValidator.getMarketingTargetDataByIdValidation,
  marketingTargetsController.getMarketingTargetDataById
);
router.post(
  "/",
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.addMarketingTargetDataValidator,
  marketingTargetsValidator.addMarketingTargetDataValidation,
  marketingTargetsController.addMarketingTargetData
);

router.post(
  "/bulk",
  protectRoute(ACCESS_PRIVILEGE.WRITE_ALL, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.addMarketingTargetDataBulkValidator,
  marketingTargetsValidator.addMarketingTargetDataBulkValidation,
  marketingTargetsController.addMarketingTargetDataBulk
);
router.patch(
  "/:id",
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.updateMarketingTargetDataValidator,
  marketingTargetsValidator.updateMarketingTargetDataValidation,
  marketingTargetsController.updateMarketingTargetData
);
router.delete(
  "/:id",
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.MARKETING_TARGETS),
  ...marketingTargetsValidator.deleteMarketingTargetDataValidator,
  marketingTargetsValidator.deleteMarketingTargetDataValidation,
  marketingTargetsController.deleteMarketingTargetData
);
export default router;
