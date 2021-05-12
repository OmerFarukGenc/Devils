const express = require("express")
const axios = require("axios")
const fs = require("fs")
const route = express.Router()

route.get("/",(req,res) => {
    const text = fs.readFileSync("./public/aboutText.html","utf8",(err,data) => {
        if(err){
            console.log("in err")
            console.log(err)

        }        

    })
    

    res.render("about/index",{text:text})
})



module.exports = route