import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";
import * as usersController from "controllers/users";
import { router } from "init";
import * as usersValidator from "validators/users";

const BASE_ROUTE = "/users";

router.get(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.USERS),
  usersController.getUsers
);
router.post(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.USERS),
  ...usersValidator.createUserValidator,
  usersValidator.createUserValidation,
  usersController.createUser
);

router.get(
  `${BASE_ROUTE}/me`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.USERS),
  usersController.getMe
);
router.patch(
  `${BASE_ROUTE}/me`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.USERS),
  ...usersValidator.updateMeValidator,
  usersValidator.updateMeValidation,
  usersController.updateMe
);
router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.USERS),
  ...usersValidator.getUserByIdValidator,
  usersValidator.getUserByIdValidation,
  usersController.getUserById
);
router.patch(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.WRITE_ALL, RESOURCE.USERS),
  ...usersValidator.updateUserValidator,
  usersValidator.updateUserValidation,
  usersController.updateUser
);

router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.WRITE_ALL, RESOURCE.USERS),
  ...usersValidator.deleteUserValidator,
  usersValidator.deleteUserValidation,
  usersController.deleteUser
);
export default router;
