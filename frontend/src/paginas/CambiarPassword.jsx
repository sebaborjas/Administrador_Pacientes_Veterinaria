import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";


const CambiarPassword = () => {

  const { guardarPassword } = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pass_actual: "",
    pass_nuevo: "",
    pass_nuevo_rep: ""

  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(Object.values(password).some(campo => campo === "")){
      setAlerta({msg: "Los campos son obligatorios", error: true})
      return
    }

    if(password.pass_nuevo.length < 6){
      setAlerta({msg: "El nuevo password debe tener al menos 6 caracteres", error: true})
      return
    }

    if(Object.values(password)[1] !== Object.values(password)[2]){
      setAlerta({msg: "Los password son distintos", error: true})
      return
    }

    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);

  }
  
  const {msg} = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10" >Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center" >Modifica tu {""} <span className="text-indigo-600 font-bold" >Password aqui</span> </p>

      <div className="flex justify-center" >
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5" >
          {msg && <Alerta  alerta={alerta} />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-2" >
              <label className="uppercase font-bold text-gray-600" >Password Actual</label>
              <input 
                type="password"
                className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded-lg"
                name="pass_actual"
                placeholder="Escribe tu Password actual"
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
              <label className="uppercase font-bold text-gray-600" >Nuevo Password</label>
              <input 
                type="password"
                className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded-lg"
                name="pass_nuevo"
                placeholder="Escribe tu Nuevo Password"
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
              <label className="uppercase font-bold text-gray-600" >Repite tu Nuevo Password</label>
              <input 
                type="password"
                className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded-lg"
                name="pass_nuevo_rep"
                placeholder="Repite tu Nuevo Password"
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <input 
              type="submit"
              value="Guardar Cambios" 
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>

        </div>
      </div>

    </>
  )
}

export default CambiarPassword