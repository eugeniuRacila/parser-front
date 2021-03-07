import { Route, Switch } from "react-router-dom";

import SearchBar from "./components/SearchBar/SearchBar";
import ProductPage from "./components/ProductPage/ProductPage";

import "./App.css";

function App() {
  return (
    <>
      <div className="search-bar">
        <SearchBar />
      </div>
      <Switch>
        <Route component={ProductPage} path="/products/:id" />
      </Switch>
    </>
  );
}

export default App;
