import React, { useState } from "react";
import './Registro.css'
import logoRegister from '../logoXYZ.png'
import firebaseApp from '../../credenciales.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function Registro() {
  const [mensaje, setMensaje] = useState("");
  const [showPass, setShowPass] = useState(false);

  async function pulsar(e) {
    e.preventDefault();
    
    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const cedula = e.target.cedula.value;
    const usuario = e.target.usuario.value;
    const correo = e.target.correoUser.value;
    const contra = e.target.contraUser.value;
    const contraV = e.target.contraUserV.value;
    const identificadorLaboral = e.target.identificadorLaboral.value;

    if (nombre.length === 0 || apellido.length === 0 || cedula.length === 0 || usuario.length === 0 || correo.length === 0 || contra.length === 0 || contraV.length === 0 || identificadorLaboral.length === 0) {
      return setMensaje("Complete todos los campos");
    }

    if (contra !== contraV) {
      return setMensaje("Las contraseñas no coinciden");
    }

    if (!correo.includes("@gmail.com") && (!correo.includes("@hotmail.com"))) {
      return setMensaje("correo invalido");
    }

    if (contra.length < 6) {
      return setMensaje("contraseña minimo 6 caracteres");
    }

    try {
      const usuarioCreado = await createUserWithEmailAndPassword(auth, correo, contra);
      if (usuarioCreado.user) {
        await addDoc(collection(db, "administradores"), {
          nombre: nombre,
          apellido: apellido,
          cedula: cedula,
          usuario: usuario,
          correo: correo,
          // **Considera cifrar la contraseña antes de guardarla**
          contraseña: contra,
          identificadorLaboral: identificadorLaboral,
          uid: usuarioCreado.user.uid
        });
        setMensaje("Usuario creado correctamente");
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMensaje("Ya existe una cuenta con este correo");
      } else {
        setMensaje("Error al crear usuario: " + error.message);
      }
    }
  }

  return (
    <div className='Registro'>
      <div className='title'>
        <img src={logoRegister} alt="logo" className='logoRegister' />
      </div>
      <form onSubmit={pulsar} id='divForm'>
        <label>
          <i className="fa-solid fa-user"></i>
          <input className="textInput" placeholder="nombre" type="text" id="nombre" />
        </label>
        <label>
          <i className="fa-solid fa-user"></i>
          <input className="textInput" placeholder="apellido" type="text" id="apellido" />
        </label>
        <label>
          <i className="fa-solid fa-id-card"></i>
          <input className="textInput" placeholder="cédula" type="text" id="cedula" />
        </label>
        <label>
          <i className="fa-solid fa-user"></i>
          <input className="textInput" placeholder="usuario" type="text" id="usuario" />
        </label>
        <label>
          <i className="fa-solid fa-envelope"></i>
          <input className="textInput" placeholder="correo electrónico" type="text" id="correoUser" />
        </label>
        <label>
          <i className="fa-sharp fa-solid fa-unlock"></i>
          <input className="textInput" placeholder="contraseña" type={showPass ? "text" : 'password'} id="contraUser" />
          {showPass ? <i className="fa-solid fa-eye" id='eye' onClick={() => setShowPass(!showPass)}></i> : <i className="fa-sharp fa-solid fa-eye-slash" id='eye' onClick={() => setShowPass(!showPass)}></i>}
        </label>
        <label>
          <i className="fa-sharp fa-solid fa-lock"></i>
          <input className="textInput" placeholder="confirmar contraseña" type={showPass ? "text" : 'password'} id="contraUserV" />
          {showPass ? <i className="fa-solid fa-eye" id='eye' onClick={() => setShowPass(!showPass)}></i> : <i className="fa-sharp fa-solid fa-eye-slash" id='eye' onClick={() => setShowPass(!showPass)}></i>}
        </label>
        <label>
          <i className="fa-solid fa-id-badge" id="rolUser"></i>
          <input className="textInput" placeholder="identificador laboral" type="text" id="identificadorLaboral" />
        </label>
        <p>{mensaje}</p>
        <a href='/' className="link">cancelar</a>
        <a href='/Registro' className="link">¿Ya tienes cuenta?</a> <a href='/IniciarSesion' className="link">Iniciar sesión</a>
        <button id="button">Crear cuenta</button>
      </form>
    </div>
  );
}

export default Registro;
