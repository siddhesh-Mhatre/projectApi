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
    imagePath:{
        type:String,
        required:true
    },
    link: {
        type:  {},
        required: true
    },
    categourey:{
        type:String,
        required:true
    },
    technology:{
        type:String,
        required:true
    },

})

module.exports=mongoose.model('Project',projectSchema)