if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const user = require("../models/user")
const bcrypt = require("bcryptjs")

const init = async () => {
    const adminPassword = (process.env.ADMIN_PASSWORD) || "admin"

    try{
        const admins = await user.find({username:"admin"}).exec()
        if(admins.length == 0){
            const hashedPassword = await bcrypt.hash(adminPassword,parseInt(process.env.SALT_ROUND));
            const admin = new user({username: "admin",password:hashedPassword,role:"admin"})
            const a = admin.save()
            console.log("admin created with password: " + adminPassword)
            return
        }else{
            console.log("admin already exists")
            return
        }
    }catch(err){
        console.log(err)
        return
    }

}

module.exports = init