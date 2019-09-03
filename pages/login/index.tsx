import { NextPage } from "next";
import { useState } from "react";

import "./login.css";

const Page: NextPage = () => {
  let [externalId, setExternalId] = useState("");
  let [password, setPassword] = useState("");

  const login = async () => {
    const body = JSON.stringify({ externalId, password });
    const response = await fetch(
      window.location.protocol + "//" + window.location.host + "/api/login",
      {
        method: "POST",
        body
      }
    );
    if (response.status === 400) {
      alert("Id of Wachtwoord verkeerd");
    } else if (response.status === 200) {
      window.location.href =
        window.location.protocol + "//" + window.location.host;
    }
  };

  return (
    <div className="text-center login-div">
      <form style={{ width: "300px" }} onSubmit={e => e.preventDefault()}>
        <h1 className="mb-3">Login</h1>
        <input
          placeholder="Login"
          className="form-control"
          onChange={e => setExternalId(e.target.value)}
          id="external-id"
        ></input>
        <input
          placeholder="Wachtwoord"
          className="form-control mt-3"
          onChange={e => setPassword(e.target.value)}
          id="password"
          type="password"
        ></input>
        <button
          className="btn btn-lg btn-primary btn-block mt-3"
          onClick={login}
        >
          Login als student
        </button>
        <button
          className="btn btn-lg btn-outline-primary btn-block mt-3"
          onClick={login}
        >
          Login als leraar
        </button>
      </form>
    </div>
  );
};

export default Page;
