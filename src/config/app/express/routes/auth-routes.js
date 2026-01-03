import { Router } from "express";

import { formLogin, login, logout, register} from "../../../../controllers/auth-controller.js";

const router = Router();

router.get("/form-login", formLogin);
router.post("/login", login);
router.get("/register", register);
router.get("/logout", logout);



export default router;