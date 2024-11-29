import * as testController from "controllers/testcontroller";
import { router } from "init";
import * as testValidator from "validators/testvalidator";

router.get("/", testController.getTestData);
router.get(
  "/:id",
  ...testValidator.getTestDataByIdValidator,
  testValidator.getTestDataByIdValidation,
  testController.getTestDataById
);
router.post(
  "/",
  ...testValidator.addTestDataValidator,
  testValidator.addTestDataValidation,
  testController.addTestData
);
router.put(
  "/:id",
  ...testValidator.updateTestDataValidator,
  testValidator.updateTestDataValidation,
  testController.updateTestData
);
router.delete(
  "/:id",
  ...testValidator.deleteTestDataValidator,
  testValidator.deleteTestDataValidation,
  testController.deleteTestData
);
export default router;
