const express = require("express")
const route = express.Router()

route.get("/",(req,res) => {
    res.render("./about/index")
})

module.exports = route