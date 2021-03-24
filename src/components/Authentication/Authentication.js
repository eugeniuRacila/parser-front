import axios from "axios";
import React, { useState } from "react";

import "./styles.css";

const authenticationRequest = async ({ username, password }) => {
  return await axios.post(
    `${process.env.REACT_APP_SERVER_URL}api/Authenticate`,
    {
      userName: username,
      password,
    }
  );
};

const Authentication = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        data: { token },
        status,
      } = await authenticationRequest({
        username,
        password,
      });

      console.log("result", status);
      console.log("token", token);

      if (status === 200) {
        console.log("setToken(token);");
        setToken(token);
      }
    } catch (e) {
      console.error(e);
      console.log("Wrong credentials");
    }
  };

  return (
    <div className="authentication" onSubmit={handleSubmit}>
      <form action="" className="authentication__form">
        <div className="authentication__input-wrapper">
          <label className="authentication__label" htmlFor="username">
            Username
          </label>
          <input
            className="authentication__input"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            type="text"
          />
        </div>
        <div className="authentication__input-wrapper">
          <label className="authentication__label" htmlFor="password">
            Password
          </label>
          <input
            className="authentication__input"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <button className="authentication__submit" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Authentication;
