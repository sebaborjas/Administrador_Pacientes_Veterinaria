import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv/config";

const app = express();

conectarDB();

app.use("/", (req, res) => {
  res.send("Hola mundo");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
