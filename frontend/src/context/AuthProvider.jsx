import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/veterinarios/perfil", config);
        //Si se autentica correctamente se guardan los datos del veterinario globalmente
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        //Si ocurre un error aseguremosno de que no esta autenticado
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    const confirmar = confirm("Deseas Cerrar Sesion?");
    if (confirmar) {
      localStorage.removeItem("token");
      setAuth({});
    }
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clienteAxios.put(url, datos, config);
      return {
        msg: "Almacenado correctamente",
        error: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "/veterinarios/actualizar-password";
      const { data } = await clienteAxios.put(url, datos, config);

      return {
        msg: data.msg,
        error: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      //Aqui en value pasamos los states que queremos poner a dispocision para que se puedan acceder en los componentes hijos
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
