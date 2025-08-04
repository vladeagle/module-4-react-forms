// import { useInput } from "../hooks/useInput";

import { useState } from "react";
import { Input } from "./Input";

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"']+(\.[^<>()[\].,;:\s@"']+)*)|(".+"))@(([^<>()[\].,;:\s@"'_]+\.){1}(-|\+)?[^<>()[\].,;:\s@"'_]{2,})$/i;

export function SignIn({ onSignInSubmit }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [emailErr, setEmailError] = useState("");
  const [passErr, setPassError] = useState("");


  const onInputBlur = (e) => {
    if (e.target.type === "email") {
      if (e.target.value && !EMAIL_REGEXP.test(e.target.value)) {
        setEmailError("Неверный формат почты");
      } else {
        setEmailError("");
      }
    }

    if (e.target.type === "password") {
      if (e.target.validity.tooShort) {
        setPassError("Длина пароля не менее 8 символов");
      } else {
        setPassError("");
      }
    }
  };

  const onFormChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSignInSubmit(inputs);
  };

  return (
    <>
      <h1>SignIn</h1>
      <form className="form" onChange={onFormChange} onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          required
          label="Почта"
          placeholder="Введите почту"
          size={300}
          radius={10}
          emptyErr={true}
          error={emailErr}
          onBlurOut={onInputBlur}
        />
        <Input
          type="password"
          name="password"
          required
          label="Пароль"
          placeholder="Введите пароль"
          description="Будьте внимательны при вводе"
          size={300}
          radius={10}
          minLength={8}
          emptyErr={true}
          error={passErr}
          onBlurOut={onInputBlur}
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
