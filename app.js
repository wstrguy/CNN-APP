// importing dotenv
require('dotenv').config();

// importing express 
const express = require('express');

// importing routes
const editorRoutes = require('./routes/editor.routes');

// creating express app
const app = express();


// middleware
app.use(express.json());

app.use('/api', editorRoutes);


module.exports = app;