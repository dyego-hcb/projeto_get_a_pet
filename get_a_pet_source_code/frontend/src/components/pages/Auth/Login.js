import { useState, useContext } from "react";
import {Link} from "react-router-dom"

import Input from "../../form/Input";

import styles from "../../form/Form.module.css";

import { Context } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const {login} = useContext(Context);

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
    login(user);
  }

  return (
    <section class={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          hadleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          hadleOnChange={handleChange}
        />
        <input type="submit" value="Entrar"/>
      </form>
      <p>
        Nāo tem conta ? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  );
}

export default Login;
