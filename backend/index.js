import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv/config";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

const app = express();

conectarDB();

app.use("/api/veterinarios", veterinarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
