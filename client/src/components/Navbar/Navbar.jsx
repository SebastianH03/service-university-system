import React from 'react';
import logo from '../Logo.png';
import './Navbar.css';

function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo-and-name">
        <h1 id='tittle'>JaveBot</h1>
        <a href="/"><img src={logo} alt="logo" /></a>
      </div>
      <div className="nav-links">
        <a href="/" className="home-link"><i class="fa-solid fa-house"></i> Home</a>
        <a href='/monitoring' className="nav-link"><i class="fa-solid fa-desktop"></i>Monitoreo</a>
        <a href='/historial' className="nav-link"><i class="fa fa-history" aria-hidden="true"></i>Historial</a>
        <a href='/error' className="nav-link"><i class="fa fa-ticket" aria-hidden="true"></i>Generar reserva</a>
        <a href='/error' className="nav-link"><i class="fa-solid fa-user"></i>Usuarios</a>
        <a href='/error' className="nav-link"><i class="fa-solid fa-newspaper"></i>Bitácora de servicios</a>
        <a href='/iniciarSesion' className="login-link"><i className="fa-solid fa-right-to-bracket"></i>Iniciar sesión</a>
      </div>
      
    </div>
  )
}

export default Navbar;
