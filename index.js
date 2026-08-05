import dotenv from "dotenv";
import connectToDataBase from "./src/database/connect.js";
import app from "./src/app.js";

dotenv.config();

await connectToDataBase();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});