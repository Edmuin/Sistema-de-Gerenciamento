import { Router } from "express";
import { body } from "express-validator";
import { index, createForm, show, store, destroy } from "../../../../controllers/user-controller.js";
import { uploadMiddleware } from "../../../../middlewares/upload-middleware.js";
import { authMiddleware } from "../../../../middlewares/auth-middleware.js";

const router = Router();

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
