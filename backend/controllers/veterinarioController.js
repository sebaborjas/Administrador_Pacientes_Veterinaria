import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/henerarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";

const registrar = async (req, res) => {
  const { nombre, email } = req.body;

  //Prevenir usuarios duplicados
  const existeUsuario = await Veterinario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Guardar un nuevo Veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    //Buen lugar para enviar el email
    emailRegistro({
      nombre,
      email,
      token: veterinarioGuardado.token
    });


    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {

  //Veterinario ya esta guardado en node, esta en el authMiddleware
  const {veterinario} = req;
  
  res.json({perfil: veterinario });
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Veterinario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = null;
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //Comprobar si el usuario existe
  const usuario = await Veterinario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(403).json({ msg: error.message });
  }
  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  //Revisar el password
  if (await usuario.comprobarPassword(password)) {
    //Autenticar
    res.json({ token: generarJWT(usuario.id) });
  } else {
    const error = new Error("El Password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req,res)=>{
  const {email} = req.body;
  
  const existeVeterinario = await Veterinario.findOne({email})
  if(!existeVeterinario){
    const error = new Error("El Usuario no existe");
    return res.status(400).json({ msg: error.message });
  }
  //Si existe generamos token y se lo enviamos por email
  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    res.json({msg: 'Hemos enviado un email con las instrucciones'})
  } catch (error) {
    console.log(error);
  }
}

const comprobarToken = async (req,res)=>{
  const {token} = req.params;
  
  const tokenValido = await Veterinario.findOne({token});

  if( tokenValido ){
    //Token valido = el usuario existe
    res.json({msg: "Token valido y el usuario existe"});
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message }); 
  }
}

const nuevoPassword = async(req,res)=>{
  //Leemos el token
  const { token } = req.params;
  //Leemos el password que el usuario envia
  const { password } = req.body

  //Modificamos db
  const veterinario = await Veterinario.findOne({token});
  if(!veterinario){
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({msg: "Password cambiado con exito"})
  } catch (error) {
    console.log(error);
  }
}

export { registrar, perfil, confirmar, autenticar,olvidePassword, comprobarToken, nuevoPassword };