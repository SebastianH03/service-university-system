const { Schema, model } = require("mongoose");


const AdminSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    national_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    laboral_id: {
        type: String,
        required: true
    }
})

module.exports = model("Admins", AdminSchema, "admins")
