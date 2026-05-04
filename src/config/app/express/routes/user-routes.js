import { Router } from "express";
import { body } from "express-validator";
import { index, createForm, show, store, update, destroy } from "../../../../controllers/user-controller.js";
import { uploadMiddleware } from "../../../../middlewares/upload-middleware.js";
import { authMiddleware } from "../../../../middlewares/auth-middleware.js";

const router = Router();

// Validações
const validateUser = [
  body("name").trim().notEmpty().withMessage("Nome é obrigatório"),
  body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
];

router.get("/", authMiddleware, index);
router.get("/create", createForm);
router.get("/:id", authMiddleware, show);
router.post("/", authMiddleware, uploadMiddleware.single("avatar"), validateUser, store);
router.put("/:id", authMiddleware, uploadMiddleware.single("avatar"), validateUser, update);
router.delete("/:id", authMiddleware, destroy);

export default router;
