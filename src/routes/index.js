import { Router } from 'express';
import userRoutes from "./user.routes.js"
import profileRoutes from "./profile.routes.js"

const apiRoutes = Router();
apiRoutes.use(userRoutes);
apiRoutes.use(profileRoutes);

export default apiRoutes;
