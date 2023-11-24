import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  async function login(credentials) {
    const res = await axios.get("http://localhost:3000/usuarios");
    const users = res.data;
    const user = users.find((u) => {
      return u.email === credentials.email;
    });
    if (user?.senha === credentials.senha) {
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
