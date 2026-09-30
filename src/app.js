import express from "express";

import clientRouter from "./routes/client.routes.js";
import viewRouter from "./routes/view.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Logger simples
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);

  next();
});


// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", "src/views");


// Rotas
app.use("/clients", clientRouter);
app.use("/views", viewRouter);


// Rota não encontrada
app.use((req, res, next) => {
  const error = new Error("Rota não encontrada.");

  error.statusCode = 404;

  next(error);
});


// Tratamento global de erros
app.use(errorMiddleware);


export default app;