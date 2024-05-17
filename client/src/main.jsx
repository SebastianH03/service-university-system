import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Error404 from './components/Error404/Error404.jsx'
import IniciarSesion from './components/IniciarSesion/IniciarSesion.jsx'
import Registro from './components/Registro/Registro.jsx'
import History  from './components/History/History.jsx'
import Reserve from './components/Reserve/Reserve.jsx'
import Monitoring from './components/Monitoring/Monitoring.jsx'

import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/iniciarSesion" element={<IniciarSesion />}/>
      <Route path="/registro" element={<Registro />}/>
      <Route path="/historial" element={<History />}/>
      <Route path="/reserve" element={<Reserve />}/>
      <Route path="/monitoring" element={<Monitoring />}/>
      <Route path="*" element={<Error404 />}/>
    </Routes>
  </BrowserRouter>
)
