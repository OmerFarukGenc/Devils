const express = require("express")
const route = express.Router()

route.get("/",(req,res) => {
    res.redirect("/errorPlaceholder")
})



module.exports = route