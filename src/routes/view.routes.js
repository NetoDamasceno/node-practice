import express from "express";

import ClientModel from "../models/client.model.js";

import validate from "../middlewares/validate.middleware.js";

import {
  clientCreateSchema,
  clientUpdateSchema,
} from "../schemas/client.schema.js";

const router = express.Router();

// GET /views/clients/new
router.get("/clients/new", (req, res) => {
  res.render("new-client", {
    errors: {},
    formData: {},
  });
});

// GET /views/clients
router.get("/clients", async (req, res, next) => {
  try {
    const clients = await ClientModel.find();

    res.render("index", { clients });
  } catch (error) {
    next(error);
  }
});

// POST /views/clients
router.post("/clients", async (req, res, next) => {
  try {
    const result = clientCreateSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).render("new-client", {
        errors: result.error.flatten().fieldErrors,
        formData: req.body,
      });
    }

    await ClientModel.create(result.data);

    res.redirect("/views/clients");
  } catch (error) {
    next(error);
  }
});

// GET /views/clients/:id/edit
router.get("/clients/:id/edit", async (req, res, next) => {
  try {
    const client = await ClientModel.findById(req.params.id);

    if (!client) {
      return res.status(404).send("Cliente não encontrado.");
    }

    res.render("edit-client", {
      client,
      errors: {},
      formData: {},
    });
  } catch (error) {
    next(error);
  }
});

// POST /views/clients/:id/edit
router.post("/clients/:id/edit", async (req, res, next) => {
  try {
    const result = clientUpdateSchema.safeParse(req.body);

    if (!result.success) {
      const client = await ClientModel.findById(req.params.id);

      if (!client) {
        return res.status(404).send("Cliente não encontrado.");
      }

      return res.status(400).render("edit-client", {
        client,
        errors: result.error.flatten().fieldErrors,
        formData: req.body,
      });
    }

    const client = await ClientModel.findByIdAndUpdate(
      req.params.id,
      result.data,
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
});

// POST /views/clients/:id/delete
router.post("/clients/:id/delete", async (req, res, next) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).send("Cliente não encontrado.");
    }

    res.redirect("/views/clients");
  } catch (error) {
    next(error);
  }
});

export default router;
