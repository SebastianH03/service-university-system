import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import robot from './robot.png'
import puj from './PUJ.jpg'

function App() {
  return (
    <div>
      <Navbar/>
      <div className='content'>
        <div id='titleContainer'>
          <h1 className='title'>Servicio de robots y drones</h1>
        </div>
        <div id='imageText'>
          <div id='image'>
            <img src={robot} alt="robot" />
          </div>
          <div id='text'>
            <p>El JaveBot de la Universidad representa una innovación en el transporte autónomo, diseñado específicamente para mejorar la eficiencia en la movilidad de recursos esenciales dentro del campus. Este sistema permite a los administrativos coordinar las tareas y la logística del transporte con anticipación, mejorando significativamente la eficacia del proceso. La necesidad de JaveBot emerge como respuesta a la creciente complejidad en la gestión de recursos y servicios universitarios. Concebido como una red de asistencia robótica adaptable a diversas funciones, JaveBot se inspira en la visión de un campus totalmente interconectado. Los principios de automatización que guían su desarrollo están siendo continuamente perfeccionados y expandidos, buscando transformarlo en una solución tecnológica avanzada y perfectamente adecuada para el entorno educativo. La evolución de JaveBot hacia su forma óptima es un proceso en curso, que promete alcanzar un nuevo estándar en la automatización de servicios universitarios.</p>
          </div>
        </div>
        <div id='imageHoriz'>
          <img id='imagePUJ' src={puj} alt='puj' />
        </div>
      </div>
    </div>
  )
}

export default App;
