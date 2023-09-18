const jwt = require('jsonwebtoken')
require('dotenv').config


/************* Verify the token of user ***************/
/*********** It helps protect the Api from unauthorize access ************/
const authorize = async function(req,res,next){
    let userIdFromParam = req.params.userId
    try {

        if(!req.headers.authorization) {return res.status(400).send({status: false, message: "Header is not present"})}

        let Token = req.headers.authorization.split(" ")[1]
        if(!Token) {return res.status(400).send({status: false, message: "Token is not present" })}
        

        jwt.verify(Token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if(err){return res.status(403).send({status:false,message:"Invalid token! author"}) }
       
            else{
                req.userId = decoded.userId
                
                next()
            }
        });
    } catch (error) {
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}

module.exports = {authorize}