import React, { useContext, useState, createContext } from "react";

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useUser() {
  return useContext(UserContext);
}
export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function updateUser(user) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={user}>
        <UserUpdateContext.Provider value={updateUser}>
            {children}
        </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
