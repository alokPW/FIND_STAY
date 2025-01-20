const express=require("express");
const router=express.Router();


//post
//index 
router.get("/",(req,res)=>{
    res.send("Get the posts")
})

//show 
router.get("/:id",(req,res)=>{
    res.send("Get for the posts id")
})

//post 
router.post("/",(req,res)=>{
    res.send("POST the users")
})

//Delete Route
router.get("/:id",(req,res)=>{
    res.send("Delete the post id")
})


module.exports=router;

