const express = require("express");
const router = express.Router();


const aboutRoute = require("./about/index");
const wisdomRoute = require("./wisdom/index");
const newsRoute = require("./news/index");
const loginRoute = require("./login/index");

router.use("/news", newsRoute);
router.use("/about", aboutRoute);
router.use("/wisdom", wisdomRoute);
router.use("/login",loginRoute);

router.get("/", (req, res) => {

  if(req.auth == true){
    console.log("authed")
    res.render("index",{logged:true,name:req.userName})
    return
  }
  res.render("index");
});

module.exports = router;
