import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  //Aqui le pasamos que utilice la informacion de AuthContext
  return useContext(AuthContext)
}

export default useAuth;