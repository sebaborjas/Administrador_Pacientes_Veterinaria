import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//No se requiere cuenta para estas rutas
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

//Esta si requiere cuenta, por ello creamos un middleware propio
router.get("/perfil", checkAuth, perfil);

export default router;
