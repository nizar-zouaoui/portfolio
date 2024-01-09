import * as projectController from "../../controllers/projects";
import { router } from "../../init";

router.get("/", projectController.getControllerTest);

export default router;
