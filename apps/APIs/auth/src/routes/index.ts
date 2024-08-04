import { router } from "../init";
import authRoutes from "./auth";
import usersRoutes from "./users";
import rolesRoutes from "./roles";
router.use(rolesRoutes);
router.use(usersRoutes);
router.use(authRoutes);

export default router;
