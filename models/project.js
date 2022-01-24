const mongoose=require('mongoose')

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    projectDate:{
        type:Date,
        required:true,
        default:Date.now
    },

})

module.exports=mongoose.model('Project',projectSchema)