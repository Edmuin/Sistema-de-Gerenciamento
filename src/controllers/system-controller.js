import path from "path";

import { SystemService } from "../services/system-service.js";
import { UserService } from "../services/user-service.js";

export const dashboard = async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/index_new.html"));
}

export const roles = async (req, res) => {
    const roles = await SystemService.roles();
    res.json(roles);
}

export const Listagem = async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/Listagem.html"));
}