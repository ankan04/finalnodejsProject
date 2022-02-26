const router= require('express').Router();
const User= require('../models/user') 
const post = require('../models/post')
const bcrypt = require('bcrypt')


//update
router.put("/:id", async(req,res)=>{
    if(req.body.userID=== req.params.id){
        if(req.body.password){
            const salt= await bcrypt.genSalt()
            req.body.password= await bcrypt.hash(req.body.password, salt)
        }

    try{
        const updateduser = await User.findByIdAndUpdate(req.params.id,{
        $set : req.body
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

router.delete("/:id", async(req,res)=>{
    if(req.body.userId=== req.params.id) {
        try{
            
            const user= await User.findById(req.params.id)
            try{
                await post.deleteMany({userName:user.userName})
                await user.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted")}
            catch(err){
                res.status(500).json(err)
            }
        } catch(err){
            res.status(404).json("user not found")
        }
        }
            else {
                res.status(401).json("invalid action")
            }
        })

        //get
        router.get("/:id", async(req,res)=>{
            try{
                const user = await User.findById(req.params.id).lean()
                res.status(200).json({...user, password: undefined})
                
            } catch(err){
                res.status(404).json(err)
            }
        })

        //Get All Users.

        router.get("/", async(req,res)=>{
            try{
                const user = await User.find()
                res.status(200).json(user)
                
            } catch(err){
                res.status(404).json(err)
            }
        })

        //Block unactive users
        router.put("/:id/block", async(req,res)=>{
            if(req.body.userID=== req.params.id && req.body.status== 'inactive')
            {
        try{
            //const user = Object.freeze() 
            res.status(403).json("You've been blocked")}
            catch(err){
                res.status(500).json(err)
            }}
             else {
                const blockedUser = await User.findByIdAndUpdate(req.params.id,{
                    $set:{ status : "inactive"}})
                    res.status(401).json(blockedUser)

                } 
            })

            //unblock

            router.put("/:id/unblock", async(req,res)=>{
                if(req.body.userID=== req.params.id && req.body.status== 'inactive'){
            try{
                const unblockbUser = await User.findByIdAndUpdate(req.params.id,{
                    $set:{ status : "active"}})
                    res.status(200).json("You are good to go", unblockbUser)}
                catch(err){
                    res.status(500).json(err)
                }
            }
                 else {
                     res.send("Happy Journey")
                    } 
                })
                    
    
                module.exports=router

            
        
        




        








