const express = require("express")
const app = express()
const mongoose=require('mongoose')
const authroute = require("./api/routes/auth") 
const usersroute = require("./api/routes/users") 


app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/blog')
.then(console.log("connected to mongodb"))
.catch(console.error)


const port=3000

console.log("hello")

app.get('/ankan', (req,res)=>{
    res.send("hello ankan")
})

// main()
//     .then(console.log)
//     .catch(console.error)

app.use("/api/auth", authroute) 
app.use("/api/users", usersroute) 

app.listen(port, ()=>{
    console.log("server started")
})