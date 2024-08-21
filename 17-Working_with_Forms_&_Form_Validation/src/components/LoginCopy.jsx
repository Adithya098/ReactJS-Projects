// import { useState } from "react";

// export default function Login() {
//   // const [enteredEmail, setEnteredEmail] = useState('');
//   // const [enteredPassword, setEnteredPassword] = useState('');
  
//   const [enteredValues, setEnteredValues] = useState({
//     email: '',
//     password:'',
//   });

//   function handleSubmit(event) {
//     event.preventDefault();
//     console.log("Submitted pa");
//     console.log(enteredValues.email,enteredValues.password);
//   }

//   // function handleEmailChange(event) {
//   //   setEnteredEmail(event.target.value);
//   // }

//   // function handlePasswordChange(event) {
//   //   setEnteredPassword(event.target.value);
//   // }


//   function handleInputChange(identifier, event) {
//     setEnteredValues(prevValues => ({
//     ...prevValues,
//     [identifier]: event.target.value
//   }))
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>

//       <div className="control-row">
//         <div className="control no-margin">
//           <label htmlFor="email">Email</label>
//           <input id="email" type="email" name="email" value={enteredValues.email} onChange={(event) => handleInputChange('email', event)} />
//         </div>

//         <div className="control no-margin">
//           <label htmlFor="password">Password</label>
//           <input id="password" type="password" name="password" value={enteredValues.password} onChange={(event) => handleInputChange('password', event)} />
//         </div>
//       </div>

//       <p className="form-actions">
//         <button className="button button-flat" type="reset">Reset</button>
//         <button className="button" type="submit">Login</button>
//       </p>
//     </form>
//   );
// }
