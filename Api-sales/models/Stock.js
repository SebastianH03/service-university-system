const { Schema, model } = require("mongoose");

const StockSchema = Schema({
    device_type:{
        type: String,
        required: true
    },
    device_status:{
        type: String,
        required: true
    },
    spare_parts:{
        type:[String],
        default:[]
    },
    device_addons:{
        type:[String],
        default:[]
    }
});

module.exports = model("Stock", StockSchema, "stock")
