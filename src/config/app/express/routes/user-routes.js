import { Router } from "express";
import { body } from "express-validator";
import { index, createForm, show, store, destroy} from "../../../../controllers/user-controller.js";
import { uploadMiddleware } from "../../../../middlewares/upload-middleware.js";
import { authMiddleware } from "../../../../middlewares/auth-middleware.js";
import { login } from "../../../../controllers/auth-controller.js";
import path from "path";

const router = Router();

// Página de login
router.get("/form-login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src/views/login.html"));
});

// Página de registo
router.get("/register", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src/views/register.html"));
});

// Validações
const validateUser = [
  body("name").trim().notEmpty().withMessage("Nome é obrigatório"),
  body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
];

router.get("/", index);
router.get("/create", createForm);
router.get("/:id", show);
router.post("/", uploadMiddleware.single("avatar"), validateUser, store);
router.delete("/:id", authMiddleware, destroy);

export default router;
