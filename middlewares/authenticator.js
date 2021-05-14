const dotenv = require("dotenv")
dotenv.config()

const jwt = require("jsonwebtoken")
const { render } = require("pug")

const authenticator = function(req,res,next) {

    if(req.cookies.token == null){
        console.log("token is null")
        req.auth = false
        next()
        return
    }
    const token = req.cookies.token
    console.log(token)

    jwt.verify(token,process.env.TOKEN_SECRET,(err, name) => {
        if(err){
            console.log("in error")
            console.log(err)
            req.auth = false
            next()
            return
        }else{
            req.auth = true
            req.userName = name
            console.log("in name, name is " + req.params.name )
            next()
            return
        }

    })
}

module.exports = authenticator