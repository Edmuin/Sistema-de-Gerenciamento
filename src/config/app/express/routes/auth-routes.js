import { Router } from "express";
import { body } from "express-validator";
import { formLogin, login, logout, register } from "../../../../controllers/auth-controller.js";

const router = Router();

router.get("/form-login", formLogin);

router.post("/login", 
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password deve ter pelo menos 6 caracteres"),
  login
);

router.post("/register",
  body("name").trim().notEmpty().withMessage("Nome é obrigatório"),
  body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("Password deve ter pelo menos 6 caracteres"),
  body("password_confirm").notEmpty().withMessage("Confirmação de password é obrigatória"),
  register
);

router.get("/logout", logout);

export default router;
