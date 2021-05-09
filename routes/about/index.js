const express = require("express")
const axios = require("axios")
const route = express.Router()

route.get("/",(req,res) => {
    res.render("about/index",{text:"This text is handwritten to response file. I am trying to figure out about this nonsense"})
})



module.exports = route