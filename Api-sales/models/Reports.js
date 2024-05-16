const { Schema, model } = require("mongoose");

const ReportSchema = Schema({
    name: {
        type: String,
        required: true
    },
    pdf_url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Reports", ReportSchema, "reports")
