//dependencias
const validator = require("validator");
const Stock = require("../models/Stock");

//Crear
const create = async (req, res) => {
    console.log("Se ha ejecutado el método de prueba create de stock")
    const params = req.body;
    try{
        if(!params.device_type || !params.device_status ){
            throw new Error("Información del dispositivo invalida");
        }
        const stock = new Stock(params);
        stock.save()
            .then(savedStock => {
                if(!savedStock){
                    return res.status(400).json({
                        status: "error",
                        message: "No se ha guardado el dispositivo"
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    stock: savedStock,
                    message: "Dispositivo guardado correctamente"
                });
            })
            .catch(error => {
                return res.status(500).json({
                    status: "error",
                    message: "No se ha guardado el dispositivo",
                    error: error.message
                });
            });  
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }
}

//Lectura general

const read = (req, res) =>{
    console.log("Se ha ejecutado el método de prueba read de stock")
    let query = Stock.find({}).then( stock => {
        if(!stock){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el dispositivo"
            })
        }
        return res.status(200).json({
            status: "Success",
            stock,
            message: "Dispositivo encontrado correctamente"
        }); 
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "ha ocurrido un error",
            error: error.message
        })
    })
    return query
}


//Lectura por ID

const read_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba obtener un sólo artículo de stock")
    let id = req.params.id;
    Stock.findById({_id:id}).then( stock => {
        if(!stock){
            return res.status(404).json({
                status: "error",
                message: "No se encontró el dispositivo"
            });
        }
        return res.status(200).json({
            status: "Success",
            stock,
            message: "Dispositivo encontrado correctamente"
        });
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "ha ocurrido un error",
            error: error.message
        });
    })
}

//Borrar por ID
const del_by_id = (req, res) => {
    console.log("Se ha ejecutado el método de prueba delete de stock")
    let id = req.params.id;
    Stock.findOneAndDelete({_id: id}).then( stock => {
        if(!stock){
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado el dispositivo"
            });
        }
        return res.status(200).json({
            status: "success",
            stock: stock,
            message: "Dispositivo eliminado correctamente"
        });
    }).catch( error => {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}


const edit = async (req, res) => {
    console.log("Se ha ejecutado el método de editar de Stock");
    const id = req.params.id;
    const params = req.body;

    try {
        if(!params.device_type || !params.device_status ){
            throw new Error("Información del dispositivo invalida");
        }
        const updatedStock = await Stock.findByIdAndUpdate({_id: id}, {$set: params}, { new: true });
        if (!updatedStock) {
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado el dispositivo"
            });
        }
        return res.status(200).json({
            status: "success",
            stock: updatedStock,
            message: "Dispositivo editado correctamente"
        });
    } catch(error) {
        return res.status(400).json({
            status: "error",
            message: error.message
        });
    }
}


module.exports = {
    create,
    read,
    read_by_id,
    del_by_id,
    edit
}