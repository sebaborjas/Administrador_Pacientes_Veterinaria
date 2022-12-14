import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  //* State para el spinner
  const [spinner, setSpinner] = useState(false);

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
     * Validacion de los campos en login
     */
    if ([email, password].includes("")) {
      setAlerta({ msg: "Ambos campos son obligatorios", error: true });
      return;
    }

    /*
     * Si todo se valido correctamente se consulta en la base de datos
     */
    try {
      setSpinner(true);
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      setSpinner(false);

      //*La autenticacion genera un token que va a ser almacenado en localStorage

      localStorage.setItem("token", data.token);
      setAlerta({ msg: "Ingresando...", error: false });
      setAuth(data);
      //Redireccionamos el usuario hacia /admin
      navigate("/admin");
    } catch (error) {
      setSpinner(false);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesion y Administra tus {""}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/*
           *Muestro Spinner de carga
           */}
          {spinner ? <Spinner /> : null}
          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ??No tienes una cuenta? Reg??strate{" "}
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvide mi Password{" "}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
