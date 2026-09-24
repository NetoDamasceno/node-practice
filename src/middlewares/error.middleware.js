import { ZodError } from "zod";

const errorMiddleware = (error, req, res, next) => {
  console.error(error);

  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      error: "Dados inválidos.",
      details: errors,
    });
  }

  const statusCode = error.statusCode || 500;

  const message =
    statusCode === 500
      ? "Ocorreu um erro interno no servidor."
      : error.message;

  if (req.path.startsWith("/views")) {
    return res.status(statusCode).send(message);
  }

  return res.status(statusCode).json({
    error: message,
  });
};

export default errorMiddleware;