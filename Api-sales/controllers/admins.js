//dependencias
const validator = require("validator");
const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');

const create = (req, res) => {
    const params = req.body;
    try{
        let name_validator = !validator.isEmpty(params.name);
        let last_name_validator = !validator.isEmpty(params.lastname);
        let national_id_validator = !validator.isEmpty(params.national_id);
        let username_validator = !validator.isEmpty(params.username);
        let laboral_id = !validator.isEmpty(params.laboral_id);
        let password_validator = !validator.isEmpty(params.password); 
        let email_validator = !validator.isEmpty(params.email) && validator.isEmail(params.email); 
        if( !name_validator || !last_name_validator || ! national_id_validator || !username_validator || laboral_id || password_validator || email_validator ){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar \n" + error
        })
    }

    // Encriptar la contraseña antes de guardar el usuario
    bcrypt.hash(params.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Error al encriptar la contraseña",
                error: err
            });
        }

        params.password = hash;  // Sustituir la contraseña con el hash
        const admin = new Admin(params);
        user.save()
            .then(savedAdmin => {
                if (!savedAdmin) {
                    return res.status(400).json({
                        status: "error",
                        message: "No se ha guardado el administrador"
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    user: savedAdmin,
                    message: "Administrador guardado correctamente"
                });
            })
            .catch(error => {
                return res.status(500).json({
                    status: "error",
                    message: "No se ha guardado el administrador",
                    error: error.message
                });
            });
    }); 
}

const read = (req, res) =>{
    let query = Admin.find({}).then( admin => {
        if(!admin){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el administrador"
            })
        }
        return res.status(200).json({
            status: "Success",
            admin,
            message: "Administrador encontrado correctamente"
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
    let query = Admin.find({_id:id}).then( admin => {
        if(!admin){
            return res.status(400).json({
                status: "error",
                message: "No se encontró el administrador"
            })
        }

        return res.status(200).json({
            status: "Success",
            admin,
            message: "Administrador encontrado correctamente"
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
    Admin.findOneAndDelete({_id:id}).then( deletedAdmin => {
        if(!deletedAdmin){
            return res.status(404).json({
                status: "Error",
                message: "No se encontro el administrador"
            });
        }

        return res.status(200).json({
            status: "Succes",
            admin: deletedAdmin,
            message: "Administrador borrado correctamente"
        });
    }).catch(error => {
        return res.status(500).json({
            status: "Error",
            message: "Ha ocurrido un error",
            error: error.message
        });
    })
}

const edit_by_id = (req, resp) => {
    let id = req.params.id;
    const params = req.body;
    try{
        let name_validator = !validator.isEmpty(params.name);
        let last_name_validator = !validator.isEmpty(params.lastname);
        let national_id_validator = !validator.isEmpty(params.national_id);
        let username_validator = !validator.isEmpty(params.username);
        let laboral_id = !validator.isEmpty(params.laboral_id);
        let password_validator = !validator.isEmpty(params.password); 
        let email_validator = !validator.isEmpty(params.email) && validator.isEmail(params.email); 
        if( !name_validator || !last_name_validator || ! national_id_validator || !username_validator || laboral_id || password_validator || email_validator ){
            throw new Error("No se ha completado todos los campos");
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar \n" + error
        })
    }
    bcrypt.hash(params.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Error al encriptar la contraseña",
                error: err
            });
        }

        params.password = hash;  // Sustituir la contraseña con el hash
        Admin.findOneAndUpdate({_id:id}, params).then( editedAdmin => {
            if(!editedAdmin){
                return resp.status(404).json({
                    status: "Error",
                    message: "No se ha encontrado el administrador"
                });
            }
    
            return resp.status(200).json({
                status: "Succes",
                admin: editedAdmin,
                message: "Administrador editado correctamente"
            });
    
        }).catch(error => {
            return res.status(500).json({
                status: "Error",
                message: "Ha ocurrido un error",
                error: error.message
            });
        })
    });
}

module.exports = {
    create,
    read,
    read_by_id,
    del_by_id,
    edit_by_id
}