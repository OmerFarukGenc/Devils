const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const express = require("express")
const user = require("../../models/user")
const bcrypt = require("bcryptjs")
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
            //const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
            //console.log(hashedPassword)
            const result = await user.find({username:username}).exec();

            if(result.length != 1){
                res.render("./login/index",{message:"Invalid username/password"})
                return
            }

            const compare = await bcrypt.compare(password,result[0].password);
            //if(result.length == 1){
            if(compare){
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