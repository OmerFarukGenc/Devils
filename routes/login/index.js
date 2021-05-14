const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const express = require("express")
const user = require("../../models/user")
const route = express.Router()

route.get("/",(req,res) => {
    res.render("./login/index",{redirect:req.query.redirect})
})

route.post("/validate",async (req,res) => {
    const target = req.body.redirect || "/";
    if((!req.body.username || !req.body.password)){
        res.render("./login/index",{message:"Invalid input"})
        return
    }else{
        const username = req.body.username
        const password = req.body.password

        try{
            const result = await user.find({username:username,password:password}).exec();
            if(result.length == 1){
                const token = jwt.sign(req.body.username,process.env.TOKEN_SECRET);
                res.cookie("token",token)
                res.redirect(target)
                return        
            }
            res.render("./login/index",{message:"Invalid username/password"})
            return
        }catch(err){
            console.log(err)
            res.render("./login/index",{message:"Database error occured"})
            return
        }

    }

})

route.get("/logout",(req,res) => {
    res.clearCookie("token")
    res.redirect("/")
})


module.exports = route