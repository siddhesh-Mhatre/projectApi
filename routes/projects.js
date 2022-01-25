const express = require("express");
const router = express.Router();
const Project = require("../models/project");

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dghti3rmh', 
  api_key: '969663222442525', 
  api_secret: 'j_26FBNLfLgvHWNdbyZ6airrfOs',
  secure: true
});


//getting all

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/:id", getProjects,(req, res) => {
  res.send(res.project);
});

//cerateing one
router.post("/", async (req, res) => {

  const file = req.files.photo;
  await cloudinary.uploader.upload(file.tempFilePath,async (err,result)=>{
    console.log(result);

/* --------- */
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    imagePath:result.url
  });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({message:err.message});
  }

/* --------- */


  })
 

});

//updateing one
router.patch("/:id", getProjects,async(req, res) => {
    if(req.body.name !=null){
        res.project.name = req.body.name
    }
    if(req.body.description !=null){
        res.project.description = req.body.description
    }
    try{
     const upadtedProject= await res.project.save()
     res.json(upadtedProject)
    }
    catch(err){
   res.status(400).json({message:err.message})
    }
});

//deleteing one
router.delete("/:id",getProjects,async(req, res) => {
 try{
  await res.project.remove()
  res.json({message:'deleted project'})
 }
 catch(err){
    res.status(500).json({message:err.message})
 }
});

async function getProjects(req,res,next){
 let project
 try{
   project = await Project.findById(req.params.id)
   if(project==null){
       return res.status(404).json({message:'Cannot find subscriber'})
   }
 }
 catch(err){
    return res.status(500).json({message:err.message})
 }
 res.project=project
 next()
}

module.exports = router;
