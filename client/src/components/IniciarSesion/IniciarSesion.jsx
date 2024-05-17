import './IniciarSesion.css';
import logo from '../LogoRobot.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseApp from '../../credenciales.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

function IniciarSesion() {
  const [showPass, setShowPass] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  async function iniciar(e) {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contra = e.target.contra.value;
    if (!correo.includes("@gmail.com") && (!correo.includes("@hotmail.com"))) {
      setMensaje("correo inválido");
    }
    const logueo = await signInWithEmailAndPassword(auth, correo, contra)
  .catch(error => {
    if (error.code === 'auth/wrong-password') {
      setMensaje("Contraseña incorrecta, intente de nuevo");
    } else if (error.code === 'auth/user-not-found') {
      setMensaje("Usuario no encontrado"); 
    } else {
      setMensaje("Error al iniciar sesión: " + error.message);
    }
  });
    if (logueo.user !== null) {
      alert("se logueo correctamente")
      setLogin(true)
      navigate("/");
    }
  }

  const singUpGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <div className='Login'>
      <form onSubmit={iniciar} id='divForm'>
      <img src={logo} alt="logo" id='logoLogin'/>
        <label>
          <i className="fa-solid fa-envelope" id='correoI'></i>
          <input placeholder="correo" type="text" id="correo" ></input>
        </label>
        <label>
          <i className="fa-solid fa-lock"></i>
          <input placeholder="contraseña" type={showPass ? "text" : 'password'} id="contra"></input>
          {showPass ? <i className="fa-solid fa-eye" id='eye' onClick={() => setShowPass(!showPass)}></i> : <i className="fa-sharp fa-solid fa-eye-slash" id='eye' onClick={() => setShowPass(!showPass)}></i>}
        </label>
        <p>{mensaje}</p>
        <a href='#' className="link">¿Has olvidado tu contraseña?</a>
        <div className='linksIniciar'>
          <a href='/Registro' className="link">Crear cuenta</a>  <a href='/' className="link">Cancelar</a>
        </div>
        <div id='googleDiv'>
          <i className="fa-brands fa-google" id='googleButton' onClick={singUpGoogle}></i>
        </div>
        <button id="button">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default IniciarSesion;