// creating editor model

// importing mongoose
const mongoose = require('mongoose');

// creating schema
const editorSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
},{
    timestamps: true
});

// creating model
module.exports = mongoose.model('Editor', editorSchema);