const express = require("express")
const app = express()
const port = 3000
const mainRoute = require("./routes/index")
const path = require("path")

app.set("views","./views")
app.set("view engine","pug")


app.use(express.static(path.join(__dirname ,"/public")))
app.use("/",mainRoute)

app.listen(process.env.PORT || 3000)