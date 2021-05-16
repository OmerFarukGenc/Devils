const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const user = require("../models/user")
const { render } = require("pug")

const authenticator = function(req,res,next) {

    if(req.cookies.token == null){
        req.auth = false
        next()
        return
    }
    const token = req.cookies.token

    jwt.verify(token,process.env.TOKEN_SECRET,async (err, username) => {
        if(err){
            console.log("ERROR IN AUTHENTICATOR")
            console.log(err)
            req.auth = false
            next()
            return
        }else{
            var u = null
            try{
                u = await user.find({username:username}).exec()
            }catch(err){
                console.log(err)
            }

            req.role = u[0].role

            req.auth = true
            req.username = username


            next()
            return
        }

    })
}

module.exports = authenticator