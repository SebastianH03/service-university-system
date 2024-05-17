//dependencias
const validator = require("validator");
const Servis = require("../models/Services");
const Stock = require("../models/Stock");

const create = async (req, res) => {
    const params = req.body;
    try{
        let start_coordinate_validator = !validator.isEmpty(params.start_coordinate);
        let pickup_coordinate_validator = !validator.isEmpty(params.pickup_coordinate);
        let end_coordinate_validator = !validator.isEmpty(params.end_coordinate);
        let service_type_validator = !validator.isEmpty(params.service_type);
        

        if( !start_coordinate_validator || !pickup_coordinate_validator || ! end_coordinate_validator || !service_type_validator || !params.destination_user || !params.requesting_user){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar \n" + error
        })
    }


    await Stock.findById({_id:params.device}).then( stock => {
        if(!stock){
            return res.status(404).json({
                status: "error",
                message: "No se encontró el dispositivo"
            });
        }
        console.log(stock);
        console.log(params.product_info[0].product_weight)
        if(stock.device_type == 'Drone'){
            if(parseFloat(params.product_info[0].product_weight) > 0.5){
                throw new Error("El Dron no puede llevar objetos de más de 0.5Kg");
            }
        }else{
            if(parseFloat(params.product_info[0].product_weight) > 1){
                throw new Error("El Robot no puede llevar objetos de más de 1Kg");
            }
        }
        console.log(params.product_info[0].product_size);
        let size = params.product_info[0].product_size.split("x");
        console.log(size);
        if(parseInt(size[0]) > 50 || parseInt(size[1]) > 50){
            throw new Error("El objeto sobrepasa las dimensiones permitidas");
        }
        
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "ha ocurrido un error",
            error: error.message
        });
    })
    
    console.log(params)
    const servis = await new Servis(params);
    await servis.save()
        .then(savedServis => {
            if (!savedServis) {
                return res.status(400).json({
                    status: "error",
                    message: "No se ha guardado el Servicio"
                });
            }
            return res.status(200).json({
                status: "Success",
                user: savedServis,
                message: "Servicio guardado correctamente"
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "No se ha guardado el Servicio",
                error: error.message
            });
        });

}

const read = (req, res) =>{
    let query = Servis.find({}).then( Servis => {
        if(!Servis){
            return res.status(400).json({
                status: "error",
                message: "No se encontró ningun servicio"
            })
        }
        return res.status(200).json({
            status: "Success",
            Servis,
            message: "Servicios encontrados correctamente"
        }); 
    })
    .catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        })
    })
    return query
}

const read_by_id = (req, res) =>{
    let id = req.params.id;
    let query = Servis.find({_id:id}).then( Servis => {
        if(!Servis){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el Servicio"
            })
        }

        return res.status(200).json({
            status: "Success",
            Servis,
            message: "Servicio encontrado correctamente"
        }); 
    })
    .catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        })
    })
    return query
}


const del_by_id = (req, res) => {
    let id = req.params.id;
    Servis.findOneAndDelete({_id:id}).then( deletedServis => {
        if(!deletedServis){
            return res.status(404).json({
                status: "Error",
                message: "No se encontro el Servicio"
            });
        }

        return res.status(200).json({
            status: "Succes",
            Servis: deletedServis,
            message: "Servicio borrado correctamente"
        });
    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}

const edit_by_id = async (req, resp) => {
    console.log("Se ha ejecutado el método de editar de Servicio");
    const id = req.params.id;
    const params = req.body;


    try{
        let start_coordinate_validator = !validator.isEmpty(params.start_coordinate);
        let pickup_coordinate_validator = !validator.isEmpty(params.pickup_coordinate);
        let end_coordinate_validator = !validator.isEmpty(params.end_coordinate);
        let service_type_validator = !validator.isEmpty(params.service_type);
        
        
        if( !start_coordinate_validator || !pickup_coordinate_validator || ! end_coordinate_validator || !service_type_validator){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar \n" + error
        })
    }

    try {
        const updatedServis = await Servis.findByIdAndUpdate({_id: id}, {$set: params}, { new: true });
        if (!updatedServis) {
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado el Servicio"
            });
        }
        return res.status(200).json({
            status: "success",
            stock: updatedServis,
            message: "Servicio editado correctamente"
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
    edit_by_id
}