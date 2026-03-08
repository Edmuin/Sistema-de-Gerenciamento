import { Router } from "express";

import { dashboard, roles ,Listagem } from "../../../../controllers/system-controller.js";

const router = Router();

// rotas das paginas principais
router.get("/", dashboard);
router.get("/roles", roles);
router.get("/listagem", Listagem);

export default router;