if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000
const mainRoute = require("./routes/index")
const path = require("path")
const bodyParser = require("body-parser")

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true})
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open",() => console.log("Connected to Mongoose"))


app.set("views","./views")
app.set("view engine","pug")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname ,"/public")))
app.use("/",mainRoute)



const server = app.listen(process.env.PORT || port)
console.log("app listening on port: "+ port);

process.on("SIGINT",() => {
    console.info("SIGINT signal received");
    console.log("Closing http server.");
    server.close(() => {
        console.log("SERVER CLOSED");
    })

})
