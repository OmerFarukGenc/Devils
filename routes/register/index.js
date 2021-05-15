const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const express = require("express")
const route = express.Router()
const user = require("../../models/user")


route.get("/",(req,res) => {
    res.render("./register/index")
})

route.post("/create", async(req,res) => {
    if(!req.body.username || !req.body.password || req.body.username.trim() == "" || req.body.username.trim() == ""){
        res.render("./register/index",{message:"Invalid input"})
        return
    }
    const username = req.body.username
    const password = req.body.password
    var users = null
    try{
        users = await user.find({username:username,password:password}).exec()
    }catch(err){
        console.log(err)
        res.render("./login/register",{message:"Database error occured"})
        return

    }

    if(users.length != 0){
        res.render("./register/index",{message:"Username exists"})
        return
    }


    try{
        const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
        const u = await (new user({username:username,password:hashedPassword})).save()
        console.log("User " + u + " created")
        res.render("./register/index",{message:"User " + username + " created"})
        return
    }catch(err){
        console.log(err)
        res.render("./register/index",{message:"Database error occured"})
        return
    }

}
)

module.exports = route