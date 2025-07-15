import { router } from "init";
import actsRoute from "./acts";
import appointmentsRoute from "./appointments";
import medicalHistoriesRoute from "./medical-histories";

router.use(actsRoute);
router.use(medicalHistoriesRoute);
router.use(appointmentsRoute);

export default router;
