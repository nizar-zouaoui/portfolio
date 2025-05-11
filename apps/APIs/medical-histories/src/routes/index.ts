import { router } from "init";
import actsRoute from "./acts";
import medicalHistoriesRoute from "./medical-histories";

router.use(actsRoute);
router.use(medicalHistoriesRoute);

export default router;
