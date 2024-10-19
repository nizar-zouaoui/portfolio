import { router } from "init";
import authRoutes from "./auth";
import rolesRoutes from "./roles";
import usersRoutes from "./users";
router.use(rolesRoutes);
router.use(usersRoutes);
router.use(authRoutes);

export default router;
