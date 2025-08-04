import { useState } from "react";
import { Input } from "./Input";
import { IconAt } from "@tabler/icons-react";

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"']+(\.[^<>()[\].,;:\s@"']+)*)|(".+"))@(([^<>()[\].,;:\s@"'_]+\.){1}(-|\+)?[^<>()[\].,;:\s@"'_]{2,})$/i;

export function SignUp({ onSignUpSubmit }) {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    gender: "",
    email: "",
    password: "",
    passwordRep: "",
  });
  const [emailErr, setEmailError] = useState("");
  const [passErr, setPassError] = useState("");
  const [passErrRep, setPassErrorRep] = useState("");

  const onInputBlur = (e) => {
    if (e.target.type === "email") {
      if (e.target.value && !EMAIL_REGEXP.test(e.target.value)) {
        setEmailError("Неверный формат почты");
      } else {
        setEmailError("");
      }
    }

    if (e.target.type === "password") {
      if (e.target.name === "password") {
        if (e.target.validity.tooShort) {
          setPassError("Длина пароля не менее 8 символов");
        } else {
          setPassError("");
        }

        if (inputs.passwordRep && e.target.value !== inputs.passwordRep) {
          setPassErrorRep("Пароли не совпадают");
        } else {
          setPassErrorRep("");
        }
      }

      if (e.target.name === "passwordRep") {
        if (e.target.value !== inputs.password) {
          setPassErrorRep("Пароли не совпадают");
        } else {
          setPassErrorRep("");
        }
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
    onSignUpSubmit(inputs);
  };

  return (
    <>
      <h1>SignUp</h1>
      <form className="form" onChange={onFormChange} onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          disabled
          label="Имя"
          placeholder="Введите имя"
          description="(пример с 'disabled')"
          size={200}
          radius={30}
          onBlurOut={onInputBlur}
        />
        <Input
          type="text"
          name="nickname"
          label="Никнейм"
          placeholder="Введите никнейм"
          description="(пример с бОльшим 'size','radius' и иконкой)"
          withIcon={<IconAt size={24} color="#ffe54c" stroke="3" />}
          size={500}
          radius={100}
          onBlurOut={onInputBlur}
        />
        <Input
          type="radio"
          radioVariants={["Мужчина", "Женщина"]}
          name="gender"
          label="Выберите пол"
          onBlurOut={onInputBlur}
        />
        <Input
          type="email"
          name="email"
          required
          label="Почта"
          placeholder="Введите почту"
          description="(пример с вариантом класса 'filled')"
          size={300}
          radius={10}
          variant={"filled"}
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
          description="Длина пароля не менее 8 символов"
          size={300}
          radius={10}
          minLength={8}
          emptyErr={true}
          error={passErr}
          onBlurOut={onInputBlur}
        />
        <Input
          type="password"
          name="passwordRep"
          required
          label="Пароль повторно"
          placeholder="Введите пароль повторно"
          description="(пример с вариантом класса 'unstyled')"
          size={300}
          radius={10}
          variant={"unstyled"}
          emptyErr={true}
          error={passErrRep}
          onBlurOut={onInputBlur}
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
