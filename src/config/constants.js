// Constantes da aplicação

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

export const FILE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  UPLOAD_DIR: "uploads",
};

export const PASSWORD_CONFIG = {
  MIN_LENGTH: 6,
  SALT_ROUNDS: 10,
};

export const JWT_CONFIG = {
  EXPIRY: "24h",
  ALGORITHM: "HS256",
};

export const VALIDATION_MESSAGES = {
  REQUIRED: "Este campo é obrigatório",
  INVALID_EMAIL: "Email inválido",
  PASSWORD_MIN: "Password deve ter pelo menos 6 caracteres",
  PASSWORD_MISMATCH: "Passwords não coincidem",
  NOT_FOUND: "Recurso não encontrado",
  UNAUTHORIZED: "Autenticação necessária",
  FORBIDDEN: "Acesso negado",
  FILE_TOO_LARGE: "Ficheiro muito grande (máximo 5MB)",
  FILE_TYPE_NOT_ALLOWED: "Tipo de ficheiro não permitido",
};
