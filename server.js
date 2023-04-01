const express = require('express');
const connectDb = require('./config/dbConnection')
const errorHandler = require('./Middleware/errorhandler');
const dotenv = require('dotenv').config()

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(errorHandler); 
app.use("/api/contacts",require("./routes/contactRoutes"));

app .listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});


