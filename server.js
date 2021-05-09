const express = require("express")
const app = express()
const port = 3000
const mainRoute = require("./routes/index")

app.set("views","./views")
app.set("view engine","pug")

app.use("/",mainRoute)

app.listen(process.env.PORT || 3000)