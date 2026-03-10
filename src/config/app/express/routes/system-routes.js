import { Router } from "express";

import { dashboard ,roles ,Listagem ,Aluno ,Orientador ,Coordenador} from "../../../../controllers/system-controller.js";

const router = Router();

// rotas das paginas principais
router.get("/", dashboard);
router.get("/roles", roles);
router.get("/listagem", Listagem);
router.get("/aluno", Aluno);
router.get("/orientador", Orientador);
router.get("/coordenador", Coordenador);

export default router;