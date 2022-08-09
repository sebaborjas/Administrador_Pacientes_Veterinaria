import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//Area publica
//No se requiere cuenta para estas rutas
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

//Endpoints para restablecer password
router.post("/olvide-password",olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

//Area privada
//Esta si requiere cuenta, por ello creamos un middleware propio
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);
router.put("/actualizar-password", checkAuth, actualizarPassword);

export default router;
