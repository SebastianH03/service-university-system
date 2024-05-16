const mongoose = require("mongoose");
const connection = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/university_service") //Método de moongose para conectar a la base de datos xyz_sales (await en caso de que tarde)
        
        console.log("Conectado correctamente a la base de datos university_service")

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos")
    }
} //por si acaso tarda la conexión en la base de datos

module.exports = {
    connection
}