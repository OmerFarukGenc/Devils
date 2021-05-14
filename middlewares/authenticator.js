const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const { render } = require("pug")

const authenticator = function(req,res,next) {

    if(req.cookies.token == null){
        req.auth = false
        next()
        return
    }
    const token = req.cookies.token

    jwt.verify(token,process.env.TOKEN_SECRET,(err, username) => {
        if(err){
            console.log("ERROR IN AUTHENTICATOR")
            console.log(err)
            req.auth = false
            next()
            return
        }else{
            req.auth = true
            req.username = username

            next()
            return
        }

    })
}

module.exports = authenticator