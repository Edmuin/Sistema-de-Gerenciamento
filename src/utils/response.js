// Response handler padronizado
export class ApiResponse {
  static success(res, data = null, message = "Sucesso", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(res, message = "Erro interno do servidor", statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  static created(res, data, message = "Recurso criado com sucesso") {
    return this.success(res, data, message, 201);
  }

  static badRequest(res, message = "Requisição inválida", errors = null) {
    return this.error(res, message, 400, errors);
  }

  static unauthorized(res, message = "Autenticação necessária") {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = "Acesso negado") {
    return this.error(res, message, 403);
  }

  static notFound(res, message = "Recurso não encontrado") {
    return this.error(res, message, 404);
  }

  static conflict(res, message = "Conflito no servidor") {
    return this.error(res, message, 409);
  }
}
