import usePacientes from "../hooks/usePacientes";
import clienteAxios from "../config/axios";
import Paciente from "./Paciente";
import Spinner from "./Spinner";

import { useState, useEffect } from "react";

const ListadoPacientes = () => {
  const [spinner, setSpinner] = useState(false);

  var { pacientes } = usePacientes();

  /*
   * Este useEffect me trae los pacientesc cargados en la base de datos la primera vez
   */
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        setSpinner(true);
        const { data } = await clienteAxios("/pacientes", config);
        setSpinner(false);

        pacientes = data;
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

  return (
    <>
      {/* *Si hay pacientes muestro los pacientes, sino muestro mensaje de que no hay ninguno */}
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : spinner ? (
        <Spinner />
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {""}
            <span className="text-indigo-600 font-bold">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
