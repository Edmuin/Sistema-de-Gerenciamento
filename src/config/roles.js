// Definição de roles
export const ROLES = {
  ADMIN: 1,
  COORDENADOR: 2,
  ORIENTADOR: 2.5,
  ALUNO: 3,
};

export const ROLE_NAMES = {
  1: "Admin",
  2: "Coordenador",
  2.5: "Orientador",
  3: "Aluno",
};

// Middleware para verificar role
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Autenticação necessária" });
    }

    if (!allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({ error: "Acesso negado - permissão insuficiente" });
    }

    next();
  };
};

// Aliases para uso comum
export const isAdmin = requireRole([ROLES.ADMIN]);
export const isCoordenador = requireRole([ROLES.ADMIN, ROLES.COORDENADOR]);
export const isOrientador = requireRole([ROLES.ADMIN, ROLES.ORIENTADOR]);
export const isStudent = requireRole([ROLES.ADMIN, ROLES.ALUNO]);
export const isAdminOrCoordenador = requireRole([ROLES.ADMIN, ROLES.COORDENADOR]);
