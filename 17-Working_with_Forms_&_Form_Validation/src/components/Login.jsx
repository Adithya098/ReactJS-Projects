import { useState,useRef } from "react";

export default function Login() {
  
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email=useRef();
  const password=useRef();

  function handleSubmit(e){
    e.preventDefault();
    const enteredEmail=email.current.value;
    const enteredPassword=password.current.value;
    console.log(enteredEmail,enteredPassword);

    const emailisValid = enteredEmail.includes('@');
    
    if(!emailisValid){
      setEmailIsInvalid(true);
      return;
    }
    
    setEmailIsInvalid(false);
    
    console.log('Email lam valid dhan da dei...');
  }

  /*
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password:'',
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted pa");
    console.log(enteredValues.email,enteredValues.password);
  }

  function handleEmailChange(event) {
    setEnteredEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setEnteredPassword(event.target.value);
  }


  function handleInputChange(identifier, event) {
    setEnteredValues(prevValues => ({
    ...prevValues,
    [identifier]: event.target.value
  }))
  };

  <input id="email" type="email" name="email" value={enteredValues.email} onChange={(event) => handleInputChange('email', event)} />
  <input id="password" type="password" name="password" value={enteredValues.password} onChange={(event) => handleInputChange('password', event)} />

  */

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email}/>
          <div className="control-error">{emailIsInvalid && <p>Enter a valid Email address!</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"  ref={password}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat" type="reset">Reset</button>
        <button className="button" type="submit">Login</button>
      </p>
    </form>
  );
}
