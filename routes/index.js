const express = require("express")
const router = express.Router()
const aboutRoute = require("./about/index")
const wisdomRoute = require("./wisdom/index")

router.use("/about",aboutRoute)
router.use("/wisdom",wisdomRoute)

router.get("/",(req,res) => {
    res.render("index")
})

module.exports = router