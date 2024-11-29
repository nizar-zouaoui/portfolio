import { ACCESS_PRIVILEGE, RESOURCE } from "@nizar-repo/auth-types";
import { protectRoute } from "@nizar-repo/route-protection";
import * as categoryController from "controllers/categories-controller";
import { router } from "init";
import * as categoryValidator from "validators/categories-validator";

const BASE_ROUTE = "/categories";

router.get(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.CATEGORIES),
  ...categoryValidator.getCategoriesValidator,
  categoryValidator.getCategoriesValidation,
  categoryController.getCategories
);
router.get(
  `${BASE_ROUTE}/all-titles`,
  protectRoute(ACCESS_PRIVILEGE.READ_ALL, RESOURCE.CATEGORIES),
  categoryController.getAllCategoriesTitles
);
router.get(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.READ, RESOURCE.CATEGORIES),
  ...categoryValidator.getCategoryByIdValidator,
  categoryValidator.getCategoryByIdValidation,
  categoryController.getCategoryById
);
router.post(
  `${BASE_ROUTE}/`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.CATEGORIES),
  ...categoryValidator.addCategoryValidator,
  categoryValidator.addCategoryValidation,
  categoryController.addCategory
);
router.put(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.WRITE, RESOURCE.CATEGORIES),
  ...categoryValidator.updateCategoryValidator,
  categoryValidator.updateCategoryValidation,
  categoryController.updateCategory
);
router.delete(
  `${BASE_ROUTE}/:id`,
  protectRoute(ACCESS_PRIVILEGE.DELETE, RESOURCE.CATEGORIES),
  ...categoryValidator.getCategoryByIdValidator,
  categoryValidator.getCategoryByIdValidation,
  categoryController.deleteCategory
);
router.post(
  `${BASE_ROUTE}/bulk`,
  protectRoute(ACCESS_PRIVILEGE.WRITE_ALL, RESOURCE.CATEGORIES),
  ...categoryValidator.addCategoryBulkValidator,
  categoryValidator.addCategoryBulkValidation,
  categoryController.addCategoryBulk
);
export default router;
