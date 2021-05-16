const express = require("express")
const route = express.Router()
const user = require("../../models/user")

route.get("/",async(req,res) => {
    try{
        if(req.auth && req.role == "admin"){
            const users = await user.find({}).exec()
            res.render("./userList/index",{users:users})
            return
        }else{
            res.status(403)
            return
        }
    }catch(err){
        console.log(err)
        res.redirect("/errorPlaceholder")
        return
    }

})



module.exports = route