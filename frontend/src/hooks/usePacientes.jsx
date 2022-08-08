import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () => {
  //Aqui le pasamos que utilice la informacion de AuthContext
  return useContext(PacientesContext)
}

export default usePacientes;