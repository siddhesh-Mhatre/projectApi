// Importing express module
const express = require('express');
const app = express();
const mongoose=require('mongoose')

const fileUpload= require('express-fileupload')

mongoose.connect(`mongodb+srv://sid:sid@cluster0.u4tog.mongodb.net/projectsList?retryWrites=true&w=majority`,{useNewUrlParser: true})
const db=mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('connected to databases'))

app.use(fileUpload({
  useTempFiles: true
}))
app.use(express.json())

// Getting Request
const projectsRouter= require('./routes/projects')
app.use('/',projectsRouter)
 
// Establishing the port
const PORT = process.env.PORT ||5000;
 
// Executing the server on given port number
app.listen(PORT, console.log(
  `Server started on port ${PORT}`));