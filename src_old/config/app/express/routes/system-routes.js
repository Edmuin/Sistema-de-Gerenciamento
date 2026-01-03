import { Router } from "express";

import { dashboard, roles } from "../../../../controllers/system-controller.js";

const router = Router();

// rotas das paginas principais
router.get("/", dashboard);
router.get("/roles", roles);

export default router;