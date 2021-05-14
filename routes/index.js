const express = require("express");
const router = express.Router();


const aboutRoute = require("./about/index");
const wisdomRoute = require("./wisdom/index");
const newsRoute = require("./news/index");
const loginRoute = require("./login/index");
const registerRoute = require("./register/index")
const userListRoute = require("./userList/index")
const errorPlaceholder = require("./errorPlaceholder/index")

router.use("/news", newsRoute);
router.use("/about", aboutRoute);
router.use("/wisdom", wisdomRoute);
router.use("/login",loginRoute);
router.use("/register",registerRoute)
router.use("/userList",userListRoute)
router.use("/errorPlaceholder",errorPlaceholder)

router.get("/", (req, res) => {

  if(req.auth == true){

    res.render("index",{logged:true,username:req.username})
    return
  }
  res.render("index");
});

module.exports = router;
