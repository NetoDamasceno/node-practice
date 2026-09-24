import express from "express";

import ClientModel from "./models/client.model.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import validate from "./middlewares/validate.middleware.js";

import {
  clientCreateSchema,
  clientUpdateSchema,
} from "./schemas/client.schema.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);

  next();
});

app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/views/clients/new", (req, res) => {
  res.render("new-client");
});

app.get("/views/clients", async (req, res) => {
  try {
    const clients = await ClientModel.find();

    res.render("index", { clients });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/clients", async (req, res, next) => {
  try {
    const clients = await ClientModel.find();

    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
});

app.get("/clients/:id", async (req, res, next) => {
  try {
    const client = await ClientModel.findById(req.params.id);

    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
});

app.post("/clients", validate(clientCreateSchema), async (req, res, next) => {
  try {
    const client = await ClientModel.create(req.body);

    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
});

app.post(
  "/views/clients",
  validate(clientCreateSchema),
  async (req, res, next) => {
    try {
      await ClientModel.create(req.body);

      res.redirect("/views/clients");
    } catch (error) {
      next(error);
    }
  },
);

app.patch(
  "/clients/:id",
  validate(clientUpdateSchema),
  async (req, res, next) => {
    try {
      const client = await ClientModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );

      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  },
);

app.delete("/clients/:id", async (req, res, next) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id);

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
});

// Edição
app.get("/views/clients/:id/edit", async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.id);

    if (!client) {
      return res.status(404).send("Cliente não encontrado.");
    }

    res.render("edit-client", { client });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post(
  "/views/clients/:id/edit",
  validate(clientUpdateSchema),
  async (req, res, next) => {
    try {
      const client = await ClientModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!client) {
        return res.status(404).send("Cliente não encontrado.");
      }

      res.redirect("/views/clients");
    } catch (error) {
      next(error);
    }
  },
);

app.post("/views/clients/:id/delete", async (req, res) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).send("Cliente não encontrado.");
    }

    res.redirect("/views/clients");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota não encontrada
app.use((req, res, next) => {
  const error = new Error("Rota não encontrada.");
  error.statusCode = 404;

  next(error);
});

// Middleware global de tratamento de erros
app.use(errorMiddleware);

export default app;
