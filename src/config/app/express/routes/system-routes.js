import { Router } from "express";
import path from "path";

import { dashboard ,roles ,Listagem ,Aluno ,Orientador ,Coordenador} from "../../../../controllers/system-controller.js";
import { authenticateToken, authorizeRole } from "../../../../middlewares/auth-middleware.js";

const router = Router();

// rotas das paginas principais
router.get("/", dashboard);
router.get("/roles", roles);
router.get("/listagem", Listagem);
router.get("/aluno", Aluno);
router.get("/orientador", Orientador);
router.get("/coordenador", Coordenador);

// Dashboard principal (após autenticação)
router.get("/dashboard", authenticateToken, (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboard.html"));
});

// Dashboard específico por role
router.get("/aluno/dashboard", authenticateToken, authorizeRole(["Aluno"]), (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/aluno-dashboard.html"));
});

router.get("/orientador/dashboard", authenticateToken, authorizeRole(["Orientador"]), (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/orientador-dashboard.html"));
});

router.get("/coordenador/dashboard", authenticateToken, authorizeRole(["Coordenador"]), (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/coordenador-dashboard.html"));
});

router.get("/admin/dashboard", authenticateToken, authorizeRole(["Admin"]), (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/admin-dashboard.html"));
});

export default router;