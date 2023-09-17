const adminModel = require('../model/adminModel')
const userModel = require('../model/userModel')
const { isValid,isValidRequestBody } = require('../validation/validator');
const validator = require('validator');
const jwt = require('jsonwebtoken')
require('dotenv').config

const adminLogin = async function(req,res){
    try{
        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }
        
        let {PhoneNumber, password}= req.body
        
        if(!isValid(PhoneNumber) || !isValid(password)){
            return res.status(400).send({
                status: false,
                message: "please provide valid phoneNumber and password"
            })
        }

        if(!validator.isMobilePhone(PhoneNumber)){
            return res.status(400).send({
                status : false,
                message : "Enter valid Mobile Number"
            })
        }

        const admin = await adminModel.findOne({PhoneNumber})
        if(!admin){
            return res.status(401).send({
              status : false, 
              message : "user Not Registerd" 
            })
        }

        const token = jwt.sign({userId : admin._id}, process.env.JWT_SECRET_KEY,{expiresIn : "1d"},
        {iat : Date.now()})
        
        res.status(200).send({
          status : true,
          message: "user login successful", 
          data : {
            userId: admin._id,
            token: token
            } 
        })

    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}

const getUser = async function(req, res){
    try{

        const user = await userModel.find()
        const count = await userModel.find().count()

        res.status(200).send({
            status: true,
            message: "User Data fetched",
            Count_of_Registerd_User : count,
            User_Data: user
        })
    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}

module.exports = {
    adminLogin,
    getUser
}