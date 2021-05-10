const express = require("express")
const route = express.Router();
const fs = require("fs")

var news = []

route.get("/",(req,res) => {
    res.render("./news/index",{news:news})
})

route.post("/submit",(req,res) => {
    if(req.body.action == "clear"){
        news = []
        res.redirect("/news")
        return
    }
    const text = req.body.text
    if(text != "")
        news.push(text)
    res.redirect("/news")
})



module.exports = route