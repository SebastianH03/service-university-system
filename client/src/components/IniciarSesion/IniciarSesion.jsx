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
  const navigate = useNavigate();

  async function iniciar(e) {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contra = e.target.contra.value;

    if (!correo.includes("@gmail.com") && (!correo.includes("@hotmail.com"))) {
      setMensaje("Correo inválido");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, contra);
      setMensaje("¡Inicio de sesión exitoso!");
      setTimeout(() => {
        setMensaje("");
        navigate("/");
      }, 3000); // Redirigir después de 3 segundos
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        setMensaje("Contraseña incorrecta, intente de nuevo");
      } else if (errorCode === 'auth/user-not-found') {
        setMensaje("Usuario no encontrado");
      } else {
        setMensaje("Error al iniciar sesión: " + errorMessage);
      }
    }
  }

  const singUpGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setMensaje("¡Inicio de sesión exitoso con Google!");
        setTimeout(() => {
          setMensaje("");
          navigate("/");
        }, 3000); // Redirigir después de 3 segundos
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setMensaje("Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.");
      });
  }

  return (
    <div className='Login'>
      <form onSubmit={iniciar} id='divForm'>
        <img src={logo} alt="logo" id='logoLogin'/>
        <label>
          <i className="fa-solid fa-envelope" id='correoI'></i>
          <input placeholder="Correo" type="text" id="correo" />
        </label>
        <label>
          <i className="fa-solid fa-lock"></i>
          <input placeholder="Contraseña" type={showPass ? "text" : 'password'} id="contra" />
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
