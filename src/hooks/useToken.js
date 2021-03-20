import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    console.log("getToken", tokenString);
    const token = JSON.parse(tokenString);
    return token;
  };

  const [token, setToken] = useState(getToken);

  const saveToken = (token) => {
    console.log("Setting the token", token);
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
