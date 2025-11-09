import path from "path";

import { SystemService } from "../services/system-service.js";
import { UserService } from "../services/user-service.js";

export const dashboard = async (req, res) => {
    const filePath = path.join(process.cwd(), "src/views/index.html");
    res.sendFile(filePath);
}

export const roles = async (req, res) => {
    const roles = await SystemService.roles();
    res.json(roles);
}
