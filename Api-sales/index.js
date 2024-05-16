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

// RUTAS
const stock_rout = require("./routes/stock");
const users_rout = require("./routes/users");
const sales_rout = require("./routes/sales");
const suppliers_rout = require("./routes/suppliers");
const history_rout = require("./routes/history");
const customer_rout = require("./routes/customer");
// Cargar Rutas

//Ruta de stock
app.use("/stock", stock_rout);

//ruta de usuario
app.use("/users", users_rout);

//Ruta de proveedores
app.use("/suppliers", suppliers_rout);

//Ruta de ventas
app.use("/sales", sales_rout);

//Ruta de historial
app.use("/history", history_rout);

//Ruta de Clientes
app.use("/customer", customer_rout);

// Crear servidor y escuchar peticiones http
app.listen(port, ()=> {
    console.log("Servidor corriendo en el puerto "+port);
})