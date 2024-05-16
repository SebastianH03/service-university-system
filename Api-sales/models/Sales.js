const { Schema, model } = require("mongoose"); 
const Stock = require("./Stock");
const Admin = require("./Admin");

const UserSchema = Schema({
    institutional_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const ServiceSchema = Schema({
    start_coordinate: {
        type: String,
        required: true
    },
    pickup_coordinate: {
        type: String,
        required: true
    },
    end_coordinate: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    device: {
        type: Schema.Types.ObjectId,
        ref: "Stock",
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    service_type: {
        type: String,
        required: true
    },
    product_info: [{
        product_weight: {
            type: String,
            required: true
        },
        product_size: {
            type: String,
            required: true
        },
        product_temperature: {
            type: String,
            required: true
        }
    }],
    event_info: [{
        event_location: {
            type: String,
            required: true
        },
        event_duration: {
            type: String,
            required: true
        }
    }],
    requesting_user: UserSchema,
    destination_user: UserSchema
})

module.exports = model("Service", ServiceSchema, "service")
