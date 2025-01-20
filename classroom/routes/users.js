const express=require("express");
const router=express.Router();


//user
//index 
router.get("/",(req,res)=>{
    res.send("Get the users")
})

//show 
router.get("/:id",(req,res)=>{
    res.send("Get for the users id")
})

//post 
router.post("/",(req,res)=>{
    res.send("POST the users")
})

//Delete 
router.get("/:id",(req,res)=>{
    res.send("Delete the users id")
})


module.exports=router;
