import path from "path";

import { SystemService } from "../services/system-service.js";
import { UserService } from "../services/user-service.js";

export const dashboard = async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboard.html"));
}

export const roles = async (req, res) => {
    const roles = await SystemService.roles();
    res.json(roles);
}

export const Listagem = async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/Listagem.html"));
}

export const Aluno = async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/aluno-dashboard.html"));
}

export const Orientador = async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/orientador-dashboard.html"));
}

export const Coordenador = async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/coordenador-dashboard.html"));
}

export const Admin = async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/views/dashboards/admin-dashboard.html"));
}
