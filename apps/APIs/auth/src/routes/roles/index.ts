import * as rolesController from "../../controllers/roles";
import * as rolesValidator from "../../validators/roles";
import { router } from "../../init";
import { protectRoute } from "@nizar-repo/route-protection";
import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";

const BASE_ROUTE = "/roles";

router.get(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.ROLES),
  rolesController.getRoles
);
router.post(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.ROLES),
  ...rolesValidator.createRoleValidator,
  rolesValidator.createRoleValidation,
  rolesController.createRole
);
router.post(
  `${BASE_ROUTE}/assign-role`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.USERS),
  ...rolesValidator.assignRoleValidator,
  rolesValidator.assignRoleValidation,
  rolesController.assignRole
);
router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.ROLES),
  ...rolesValidator.getRoleByIdValidator,
  rolesValidator.getRoleByIdValidation,
  rolesController.getRoleById
);
router.patch(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.ROLES),
  ...rolesValidator.updateRoleValidator,
  rolesValidator.updateRoleValidation,
  rolesController.updateRole
);

router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.ROLES),
  ...rolesValidator.deleteRoleValidator,
  rolesValidator.deleteRoleValidation,
  rolesController.deleteRole
);
export default router;
