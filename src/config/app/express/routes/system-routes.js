import { Router } from "express";
import path from "path";

import { dashboard ,roles ,Listagem ,Aluno ,Orientador ,Coordenador ,Admin} from "../../../../controllers/system-controller.js";
import { isAdmin } from "../../../roles.js";

const router = Router();

// rota inicial do projeto sempre para o dashboard
router.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboard.html"));
});
router.get("/roles", roles);
router.get("/listagem", Listagem);
router.get("/aluno", Aluno);
router.get("/orientador", Orientador);
router.get("/coordenador", Coordenador);

// Dashboard principal
router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboard.html"));
});

// Dashboard específico por role
router.get("/aluno/dashboard", (req, res) => {
    res.sendFile(
        path.join(
            process.cwd(),
            "src/views/dashboards/aluno-dashboard.html"
        )
    );
});

router.get("/orientador/dashboard", (req, res) => {
    res.sendFile(
        path.join(
            process.cwd(),
            "src/views/dashboards/orientador-dashboard.html"
        )
    );
});

router.get("/coordenador/dashboard", (req, res) => {
    res.sendFile(
        path.join(
            process.cwd(),
            "src/views/dashboards/coordenador-dashboard.html"
        )
    );
});

router.get("/admin/dashboard", (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/admin-dashboard.html"));
});

router.get("/Listagem", (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/Listagem.html"));
});

export default router;