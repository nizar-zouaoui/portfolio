import * as authController from "../../controllers/auth";
import * as authValidator from "../../validators/auth";
import { router } from "../../init";

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
export default router;
