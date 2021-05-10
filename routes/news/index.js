const express = require("express")
const route = express.Router();
const news = require("../../models/news")


const renderNewsPage = (res,params = {}) => {
    res.render("./news/index",params)

};

const getNews = async (searchParams = {}) => {
    let query = news.find()

    try{
        const n = await query.sort({date:"desc"}).exec()
        return n
    }catch(err){
        console.log(err)
        throw err
    }

}

route.get("/",async (req,res) => {
    try{
        const n = await getNews()
        renderNewsPage(res,{news:n}) 
        return
    }catch(err){
        console.log(err)
        renderNewsPage(res,{errors:["Cannot get news"]})
    }

});

route.post("/submit",async (req,res) => {
    let n = null
    try{
        n = await getNews()
    }catch(err){
        console.log(err)
        renderNewsPage(res,{errors : ["Cannot get news"]})
        return
    }

    if(req.body.action == "submit"){
        if(req.body.header == null|| req.body.content == null|| req.body.content.trim() == "" || req.body.header.trim() == ""){
            renderNewsPage(res,{errors: ["Form input is invalid"],news:n})
            return
        }


        const newNews = new news({
            header:req.body.header,
            content:req.body.content,
            date: new Date(),
        })
        
        try{
            const n = await newNews.save();
            res.redirect("/news");
            return
        }catch(err){
            console.log(err)
            renderNewsPage(res,{news:n, errors:["Cannot save news"]})
            return
        }
    }else if(req.body.action == "clear"){
        news.deleteMany({},err => {
            if(err){
                console.log(err)
                renderNewsPage(res,{news:n, errors:["Cannot remove news"]})
                return
            }
            res.redirect("/news")
            return
        })
    }else{
        res.redirect("/news")
    }
    
})



module.exports = route