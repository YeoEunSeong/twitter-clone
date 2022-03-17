import React, { useState } from "react";
import { createAccount } from "fbase";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccout] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        const userCredential = await createAccount(email, password);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          type="text"
          required
          placeholder="Email"
          value={email}
        />
        <input
          onChange={onChange}
          name="password"
          type="password"
          required
          placeholder="Password"
          value={password}
        />
        <button tpye="submit">
          {newAccount ? "Create Account" : "Sign In"}
        </button>
      </form>
      <span>{errorMsg}</span>
      <div>
        <button>Continue with Google</button>
        <button disabled>Continue with Github</button>
      </div>
    </>
  );
};

export default Auth;
