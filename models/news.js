const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema({
    header: {type:String, required:true},
    content: {type:String,required:true},
    date: {type:Date, required:true}
})

module.exports = mongoose.model("News",newsSchema)