import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha_alta, setFecha_alta] = useState(Date.now());
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState();

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect( ()=>{
    if(paciente?.nombre){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha_alta(paciente.fecha_alta);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  },[paciente] )

  const handleSubmit = e => {
    e.preventDefault();


    //Validamos el formulario
    if([nombre, propietario, email, fecha_alta, sintomas].includes('')){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true})
      return
    }
    setAlerta({});
    guardarPaciente({ nombre, propietario, email, fecha_alta, sintomas, id });
    setAlerta({msg: "Guardado Correctamente", error: false});
    
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha_alta("");
    setSintomas("");
    setId("");
  }

  const {msg} = alerta

  return (
    <>

      <h2 className="font-black text-3xl text-center" >Administrador de Pacientes</h2>

      <p className="text-xl mt-5 mb-10 text-center" >
      Agrega tus pacientes {""}
         <span className="text-indigo-600 font-bold" >y Administralos</span>
      </p>

     <form 
      className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
      onSubmit={handleSubmit}
     >
      <div className="mb-5" >
        <label
            htmlFor="mascota"
            className="text-gray-700 uppercase font-bold"
          >Nombre de Mascota</label>
          <input 
            id="mascota"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre de Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
      </div>

       <div className="mb-5" >
        <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >Nombre del Propietario</label>
          <input 
            id="propietario"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
      </div>

       <div className="mb-5" >
        <label
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >Email</label>
          <input 
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
      </div>

      <div className="mb-5" >
        <label
            htmlFor="fecha_alta"
            className="text-gray-700 uppercase font-bold"
          >Fecha Alta</label>
          <input 
            id="fecha_alta"
            value={fecha_alta}
            onChange={e => setFecha_alta(e.target.value)}
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
      </div>

      <div className="mb-5" >
        <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >Sintomas</label>
          <textarea 
            id="sintomas"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
            placeholder="Describe los Sintomas de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
      </div>

      <input 
      type="submit"
      className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
      value={id ? "Guardar Cambios" : "Agregar Paciente"} 
      />
     </form>
     {msg && <Alerta  alerta={alerta} />}
    </>
  )
}

export default Formulario