import jwt from "jsonwebtoken";
const getRoleName = (roleId) => {
  const roles = {
    1: "Admin",
    2: "Coordenador",
    2.5: "Orientador",
    3: "Aluno",
  };
  return roles[roleId] || "Aluno";
};
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    if (req.headers.accept?.includes("text/html")) {
      return res.redirect("/auth/login");
    }
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "seu_segredo_aqui");
    req.user = {
      ...decoded,
      role_id: decoded.role_id || 3,
      role: decoded.role || getRoleName(decoded.role_id),
    };
    next();
  } catch (err) {
    if (req.headers.accept?.includes("text/html")) {
      return res.redirect("/auth/login");
    }
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "seu_segredo_aqui");
      req.user = {
        ...decoded,
        role_id: decoded.role_id || 3,
        role: decoded.role || getRoleName(decoded.role_id),
      };
    } catch (err) {
      // Token inválido, continuar sem autenticação
    }
  }

  next();
};

export const authorizeRole = (expectedRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const userRole = req.user.role;
    const allowed = Array.isArray(expectedRole)
      ? expectedRole.includes(userRole)
      : userRole === expectedRole;

    if (!allowed) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    next();
  };
};
