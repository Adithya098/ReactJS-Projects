import { useState } from "react";
import Input from "./Input";
import {isEmail,isNotEmpty} from '../util/validation'

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
    });

  const emailisinvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
  const passwordisinvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted");
    console.log(enteredValues.email, enteredValues.password);
  }

  function handleInputChange(identifier, event) {
    setEnteredValues(prevValues => ({
      ...prevValues,
      [identifier]: event.target.value,
    }));
    setDidEdit(prevEdit=>({
        ...prevEdit,
        [identifier]: false,
    }));
  }

  function handleInputBlur(identifier){
    setDidEdit(prevEdit => ({
    ...prevEdit,
    [identifier]: true
    }));
}
return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input label="Email" 
                id="email" 
                type="email" 
                name="email" 
                value={enteredValues.email} 
                onBlur={()=>handleInputBlur('email')}
                onChange={(event) => handleInputChange('email', event)}
                error={emailisinvalid && 'Email is invalid'}
        />
        <Input label="Password" 
                id="password" type="password" 
                name="password" 
                value={enteredValues.password} 
                onBlur={()=>handleInputBlur('password')}
                onChange={(event) => handleInputChange('password', event)}
                error={passwordisinvalid && 'Password is invalid'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat" type="reset">Reset</button>
        <button className="button" type="submit">Login</button>
      </p>
    </form>
  );
}

