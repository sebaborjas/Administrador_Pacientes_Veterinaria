import Paciente from "../models/Paciente.js";

const agregarPacientes = async (req,res) => {

  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id
  try {
    const pacienteGuardado = await paciente.save();
    res.json(pacienteGuardado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req,res) => {
  //Filtra de a cuerdo a que verinario tenga asociada la mascota
  const pacientes = await Paciente.find()
  .where("veterinario")
  .equals(req.veterinario) ;
  res.json(pacientes)
};

const obtenerPaciente = async (req,res)=>{
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if(!paciente){
    return res.status(404).json({msg: "Mensaje no encontrado"})
  }

  //Al ser object id siempre los evalia diferentes, entonces hay que pasarlos a string
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({msg: "Accion no valida"})
  }

  
  res.json({paciente})
  
};

const actualizarPaciente = async (req,res)=>{
  const { id } = req.params;
  const paciente = await Paciente.findById(id);
  if(!paciente){
    return res.status(404).json({msg: "Mensaje no encontrado"})
  }

  //Al ser object id siempre los evalia diferentes, entonces hay que pasarlos a string
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({msg: "Accion no valida"})
  }
  
  //Actualizar paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email  || paciente.email;
  paciente.fecha_alta = req.body.fecha_alta || paciente.fecha_alta;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
  
};

const eliminarPaciente = async (req,res)=>{
  
  const { id } = req.params;
  
  const paciente = await Paciente.findById(id);

  if(!paciente){
    return res.status(404).json({msg: "No encontrado"});
  };

  //Al ser object id siempre los evalia diferentes, entonces hay que pasarlos a string
  if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    return res.json({msg: "Accion no valida"});
  };

  try {
    await paciente.deleteOne();
    res.json({msg: "Paciente eliminado"});
  } catch (error) {
    console.log(error);
  }

};


export {agregarPacientes, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente};