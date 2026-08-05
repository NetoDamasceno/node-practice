import mongoose from "mongoose";

const connectToDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@users.zyjmo.mongodb.net/database?appName=Users`
    );

    console.log("✅ Conexão ao banco de dados realizada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);

    process.exit(1);
  }
};

export default connectToDataBase;