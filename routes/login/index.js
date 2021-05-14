const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const express = require("express")
const route = express.Router()

route.get("/",(req,res) => {
    res.render("./login/index",{redirect:req.query.redirect})
})

route.post("/validate",(req,res) => {
    if((!req.body.name || !req.body.password)){
        res.redirect("/login")
        return
    }else if(req.body.name == "test" && req.body.password == "test"){

        const target = req.body.redirect || "/";
        const token = jwt.sign(req.body.name,process.env.TOKEN_SECRET);
        res.cookie("token",token)

        res.redirect("/")
        return
    }else {
        res.redirect("/about")
    }

})

route.get("/logout",(req,res) => {
    res.clearCookie("token")
    res.redirect("/")
})


module.exports = route