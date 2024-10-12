import * as authController from "../../controllers/auth";
import * as authValidator from "../../validators/auth";
import { router } from "../../init";
import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";

const BASE_ROUTE = "/auth";

router.post(
  `${BASE_ROUTE}/classic/login`,
  ...authValidator.classicSignInValidator,
  authValidator.classicSignInValidation,
  authController.classicSignIn
);
router.post(
  `${BASE_ROUTE}/classic/sign-up`,
  ...authValidator.classicSignUpValidator,
  authValidator.classicSignUpValidation,
  authController.classicSignUp
);

router.get(
  `${BASE_ROUTE}/refresh-access-token`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.USERS),
  authController.refreshAccessToken
);
export default router;
