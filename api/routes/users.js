const router= require('express').Router();
const user= require('../models/user') 
const bcrypt = require('bcrypt')


//update
router.put("/:id", async(req,res)=>{
    if(req.body.userID=== req.params.id){
        if(req.body.password){
            const salt= await bcrypt.genSalt()
            req.body.password= await bcrypt.hash(req.body.password, salt)
        }

    try{
        const updateduser = await user.findByIdAndUpdate(req.params.id,{
        $set : req.body,
    }) 
    res.status(200).json(updateduser)}
    catch(err){
        res.status(500).json(err)
    }
}
    else {
        res.status(401).json("invalid action")
    }
})
        
//delete




module.exports=router


