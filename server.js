const express = require("express")
const app = express()
const port = 3000
const mainRoute = require("./routes/index")
const path = require("path")
const bodyParser = require("body-parser")

app.set("views","./views")
app.set("view engine","pug")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname ,"/public")))
app.use("/",mainRoute)



const server = app.listen(process.env.PORT || 3001)
console.log("app listening on port: "+ 3001);

process.on("SIGINT",() => {
    console.info("SIGINT signal received");
    console.log("Closing http server.");
    server.close(() => {
        console.log("SERVER CLOSED");
    })

})
