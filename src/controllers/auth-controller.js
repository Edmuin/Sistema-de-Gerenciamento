import path from "path";

import { AuthService } from "../services/auth-service.js";
import { UserService } from "../services/user-service.js";

export const formLogin = async (req, res) => {
    // const users = await UserService.listar();
    res.sendFile(path.join(process.cwd(), "src/views/auth/login.html"));
};

export const login = async (req, res) => {
    try {
        const user = await UserService.buscarPorId(req.params.id);
        res.render("users/show", { user });
    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const register = async (req, res) => {
    
        res.sendFile(path.join(process.cwd(), "src/views/auth/register.html"));
    
};

export const logout = async (req, res) => {
    res.redirect('/auth/login.html');
};
