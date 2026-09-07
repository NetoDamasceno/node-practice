import express from "express";
import ClientModel from "./models/client.model.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);

  next();
});

app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/views/clients", async (req, res) => {
  try {
    const clients = await ClientModel.find();

    res.render("index", { clients });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/clients", async (req, res) => {
  try {
    const clients = await ClientModel.find();

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/clients/:id", async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.id);

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/clients", async (req, res) => {
  try {
    const client = await ClientModel.create(req.body);

    res.status(201).json(client);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/clients/:id", async (req, res) => {
  try {
    const client = await ClientModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(client);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/clients/:id", async (req, res) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id);

    res.status(200).json(client);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default app;
