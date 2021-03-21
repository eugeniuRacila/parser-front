import { Route, Switch } from "react-router-dom";

import useToken from "./hooks/useToken";

import Authentication from "./components/Authentication/Authentication";
import SearchBar from "./components/SearchBar/SearchBar";
import ProductPage from "./components/ProductPage/ProductPage";

import "./App.css";

function App() {
  const { token, setToken } = useToken();

  const getTokenExpirationDate = (token) =>
    JSON.parse(atob(token?.split(".")[1]))?.exp;

  const checkIfTokenIsExpired = (token) => {
    if (!token) return true;
    const tokenExpirationDate = getTokenExpirationDate(token);
    return tokenExpirationDate && tokenExpirationDate <= Date.now() / 1000;
  };

  if (!token || checkIfTokenIsExpired(token)) {
    console.log("Removing token", token);
    localStorage.removeItem("token");
    return (
      <div className="auth">
        <Authentication setToken={setToken} />
      </div>
    );
  }

  return (
    <>
      <div className="search-bar">
        <SearchBar token={token} />
      </div>
      <Switch>
        <Route component={ProductPage} path="/products/:name" token={token} />
      </Switch>
    </>
  );
}

export default App;
