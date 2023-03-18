// creating news schema 

// importing mongoose
const mongoose = require('mongoose');

// creating schema
const newsSchema = new mongoose.Schema({
    editorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editor',
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    }
},{
    timestamps: true
});

// creating model
module.exports = mongoose.model('News', newsSchema);