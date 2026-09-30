import express from "express";

import ClientModel from "../models/client.model.js";

import validate from "../middlewares/validate.middleware.js";

import {
  clientCreateSchema,
  clientUpdateSchema,
} from "../schemas/client.schema.js";

const router = express.Router();


// GET /clients
router.get("/", async (req, res, next) => {
  try {
    const clients = await ClientModel.find();

    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
});


// GET /clients/:id
router.get("/:id", async (req, res, next) => {
  try {
    const client = await ClientModel.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        error: "Cliente não encontrado.",
      });
    }

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
});


// POST /clients
router.post(
  "/",
  validate(clientCreateSchema),
  async (req, res, next) => {
    try {
      const client = await ClientModel.create(req.body);

      res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  },
);


// PATCH /clients/:id
router.patch(
  "/:id",
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
        return res.status(404).json({
          error: "Cliente não encontrado.",
        });
      }

      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  },
);


// DELETE /clients/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        error: "Cliente não encontrado.",
      });
    }

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
});


export default router;