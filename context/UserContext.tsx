import React from "react";
import { UserContextType, IUser } from "../types/user";

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = React.useState<IUser[]>(null);

  const saveUser = (u: IUser) => {
    const newUser: IUser = {
      id: Math.random(), // not really unique
      email: u.email,
      name: u.name,
      phone: u.phone,
    };
    setUser([...user, newUser]);
  };
  

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
