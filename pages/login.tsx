import { NextPage } from "next";
import { useState } from "react";
import Router from "next/router";

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
    <div>
      <input
        onChange={e => setExternalId(e.target.value)}
        id="external-id"
      ></input>
      <input
        onChange={e => setPassword(e.target.value)}
        id="password"
        type="password"
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Page;
