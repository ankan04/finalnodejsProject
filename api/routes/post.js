const router= require('express').Router();
const User= require('../models/user') 
const Post = require('../models/post')
const bcrypt = require('bcrypt')


// create new post
router.post("/", async(req,res)=>{
    console.log(req.user)
    try{
     const newPost = new Post({...req.body, _createdBy:req.user._id})
     const savedPost= await newPost.save()
     res.status(201).json(savedPost)
 } catch(err){
     res.status(500).json(err)
 }
})
        
//update

router.put("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post._createdBy.toString()=== req.user._createdBy.toString()){
            try{
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                })
                res.status(200).json(updatePost)
            } catch(err){
             res.status(500).json(err)
 
            }
        } else {
            res.status(401).json("invalid action")
        }
            
    } catch (err){
}         res.status(500).json(err)
        })

        //delete

        router.delete("/:id", async(req,res)=>{
            try{
                const post = await Post.findById(req.params.id)
                if(post.username === req.body.userName){
                    try{
                        await post.delete()
                        res.status(200).json("deleted")
                    } catch(err){
                     res.status(500).json(err)
                    }
                } else {
                    res.status(401).json("invalid action")
                }
            } catch (err){
        }         res.status(500).json(err)
                })

            // get post
            router.get("/:id", async(req,res)=>{
                    try{
                        const post = await Post.findById(req.params.id)
                        res.status(200).json(post)
                        
                    } catch(err){
                        res.status(404).json(err)
                    }
                })

                //get all

                router.get("/", async(req,res)=>{
                    try{
                        const post = await Post.find()
                        res.status(200).json(post)
                        
                    } catch(err){
                        res.status(404).json(err)
                    }
                })



                module.exports=router

        








