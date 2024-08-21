import logo from '../assets/logo.png';
import { styled } from 'styled-components';

const HeaderContainer = styled.header` 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

& img {
  object-fit: contain;
  margin-bottom: 2rem;
  width: 11rem;
  height: 11rem;
}

& h1 {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-align: center;
  text-transform: uppercase;
  color: #9a3412;
  font-family: 'Pacifico', cursive;
  margin: 0;
}

& p {
  text-align: center;
  color: brown ;
  margin: 0;
  font-size: 1.5rem;
}`


export default function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </HeaderContainer>
  );
}

