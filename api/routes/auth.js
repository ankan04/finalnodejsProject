const router= require('express').Router();
const User= require('../models/user') 
const bcrypt = require('bcrypt')


//register
router.post("/register", async(req,res)=>{
    try{
        //const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newUser= new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password:hashPassword
        })
        const user=await newUser.save()
        res.status(200).json(user)

    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }

})


//login
router.post("/login", async(req,res)=>{
    try{
        const user= await User.findOne({userName:req.body.userName}).lean()
        !user && res.status(400).json("wrong credantials")

        const validated= await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("wrong credantials")

        res.status(200).json({...user, password: undefined})

        
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
module.exports=router

    