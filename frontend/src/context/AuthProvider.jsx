import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState({});

  return(
    <AuthContext.Provider
      //Aqui en value pasamos los states que queremos poner a dispocision para que se puedan acceder en los componentes hijos
      value={{
        auth,
        setAuth
      }}
    >

      {children}
    </AuthContext.Provider>

  )
};

export { AuthProvider };

export default AuthContext;