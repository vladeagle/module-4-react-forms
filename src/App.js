import { useState } from "react";
import "./App.css";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";

function App() {
  const [signInInput, setSignInInput] = useState(null);
  const [signUpInput, setSignUpInput] = useState(null);

  const onSignInSubmit = (e) => {
    setSignInInput(e);
  };

  const onSignUpSubmit = (e) => {
    setSignUpInput(e);
  };

  return (
    <>
      <div className="app">
        <div className="app__container">
          <SignIn onSignInSubmit={onSignInSubmit} />
          <div className="spacer"></div>

          {signInInput && (
            <>
              <h2>Данные из формы SignIn:</h2>
              {Object.keys(signInInput).map((el, idx) => (
                <span key={idx}>
                  {el}: {signInInput[el]}
                </span>
              ))}
              <div className="spacer"></div>
            </>
          )}

          <SignUp onSignUpSubmit={onSignUpSubmit} />

          {signUpInput && (
            <>
              <div className="spacer"></div>
              <h2>Данные из формы SignUp:</h2>
              {Object.keys(signUpInput).map((el, idx) => (
                <span key={idx}>
                  {el}: {signUpInput[el]}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
