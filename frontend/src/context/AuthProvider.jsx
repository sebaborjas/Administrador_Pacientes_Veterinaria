import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect( () => {
    const autenticarUsuario = async ()=>{
      const token = localStorage.getItem('token');
      
      if(!token) {
        setCargando(false);
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios('/veterinarios/perfil', config);
        //Si se autentica correctamente se guardan los datos del veterinario globalmente
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        //Si ocurre un error aseguremosno de que no esta autenticado
        setAuth({})
      }

      setCargando(false);

    }
    autenticarUsuario();
  },[])

  return(
    <AuthContext.Provider
      //Aqui en value pasamos los states que queremos poner a dispocision para que se puedan acceder en los componentes hijos
      value={{
        auth,
        setAuth,
        cargando
      }}
    >

      {children}
    </AuthContext.Provider>

  )
};

export { AuthProvider };

export default AuthContext;