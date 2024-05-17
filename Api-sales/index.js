//Dependencias
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Iniciar la base de datos
console.log("App de Node iniciada")

// Conectar la base de datos
connection();

// Crear servidor Node (para escuchar peticiones http y crear rutas) Express es el framework
const app = express();
const port = 3900;

// Configurar cors (middleware antes de ejecutar una ruta para evitar problemas de dominio)
app.use(cors());

// Convertir body a objeto js. Parsear los datos a un objeto js.
app.use(express.json()); //Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); //datos que llegan en urlencoded los convierte a json (formularios normales)

// Middleware
const History = require('./models/History'); // Asegúrate de ajustar la ruta al archivo del modelo

app.use(async (req, res, next) => {
    const collection = req.url.split('/')[1]; // Extrae el nombre de la colección de la URL

    const history = new History({
        action: req.method,
        collection: collection,
    });

    try {
        await history.save();
        console.log('Acción guardada en el historial');
    } catch (error) {
        console.error('Error al guardar la acción en el historial:', error);
    }

    next();
});

// RUTAS
const stock_rout = require("./routes/stock");
const admins_rout = require("./routes/admins");
const services_rout = require("./routes/services");
const history_rout = require("./routes/history");

// Cargar Rutas

//Ruta de stock
app.use("/stock", stock_rout);

//ruta de usuario
app.use("/admins", admins_rout);

//Ruta de Services
app.use("/services", services_rout);

//Ruta de History
app.use("/history", history_rout);



// Crear servidor y escuchar peticiones http
app.listen(port, ()=> {
    console.log("Servidor corriendo en el puerto "+port);
})