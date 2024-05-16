//Dependencias
const express = require("express");
const router = express.Router();

const AdminsController = require("../controllers/services");


//guardar
router.post("", AdminsController.create);

//leer
router.get("", AdminsController.read);
router.get("/:id", AdminsController.read_by_id);

//Borra
router.delete("/:id", AdminsController.del_by_id);

//Editar
router.put("/:id", AdminsController.edit_by_id);

module.exports = router;