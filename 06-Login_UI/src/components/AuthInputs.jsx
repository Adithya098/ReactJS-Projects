import { useState } from 'react';
import { styled } from 'styled-components';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const LabelContainer = styled.label`
display: block;
margin-bottom: 0.5rem;
font-size: 0.75rem;
font-weight: 700;
letter-spacing: 0.1em;
text-transform: uppercase;
color: ${ ({$invalid}) => $invalid ? '#f87171' : '#6b7280'};
`;

const InputContainer = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${ ({$invalid}) => $invalid ? '#fed2d2' : '#d1d5db'};;
  color: ${ ({$invalid}) => $invalid ? '#ef4444' : '#374151'};
  border: 1px solid  ${ ({$invalid}) => $invalid ? '#ef4444' : 'transparent'};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        <p>
          <LabelContainer $invalid={emailNotValid}>Email</LabelContainer>
          <InputContainer $invalid={emailNotValid}
            type="email"
            //className={emailNotValid ? 'invalid' : undefined}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <LabelContainer $invalid={passwordNotValid}>Password</LabelContainer>
          <InputContainer
            type="password"
            $invalid={passwordNotValid}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      </ControlContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <button className='button' onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
}
