import { Router } from "express";

import { formLogin, login, logout } from "../../../../controllers/auth-controller.js";

const router = Router();

router.get("/form-login", formLogin);
router.post("/login", login);
router.get("/logout", logout);


export default router;