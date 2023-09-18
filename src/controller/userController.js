const userModel = require('../model/userModel')
const { isValid,isValidRequestBody } = require('../validation/validator');
const validator = require('validator');
const aadhaar_validator = require('aadhaar-validator')
const jwt = require('jsonwebtoken')
require('dotenv').config


/********* User Registeration API*************/
const registerUser = async function(req,res){
    try{
        /**********  Checking null value and undefined value************/

        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }

        let {Name, PhoneNumber, Age, Pincode, Aadhaar, password} = req.body
        if( !isValid(Name) || !isValid(PhoneNumber) || !isValid(Age) && typeof Age !== 'number' || 
        !isValid(Pincode) && typeof Pincode !== 'number' || !isValid(Aadhaar) || !isValid(password) ){
            return res.status(400).send({
                status: false,
                message : "Enter valid detail"
            })
        }

        /*****************Validatin passwor length*************/
        password = password.trim()
        if(password.length < 8 || password.length > 15){
            return res.status(400).send({
                status: false,
                message: "Password length must between 8 to 15"
            })
        }

        /*****************Validatin Phone Number using validator Package,
         also checked in DB to maintain uniqness of Mobile Number*************/
        PhoneNumber = PhoneNumber.trim()
        if(!validator.isMobilePhone(PhoneNumber)){
            return res.status(400).send({
                status : false,
                message : "Enter valid Mobile Number"
            })
        }
        const phoneExist = await userModel.findOne({PhoneNumber})     
        if(phoneExist){
            return res.status(400).send({
              status : false, 
              message : "Phone Number already registerd" 
            })
        }

        if(Aadhaar.length !== 12){
            return res.status(400).send({
                status: false,
                message: "Enter Valid Aadhaar Number"
            })
        }

        // if(!aadhaar_validator.isValidNumber(Aadhaar)){
        //     return res.status(400).send({
        //         status: false,
        //         message: "Enter Valid Aadhaar Number"
        //     })
        // }


        const user = await userModel.create(req.body)

        res.status(201).send({
            status: true,
            message: "user Register successfully",
            data: user
        })

    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}


/************* USer Login API *****************/
const userLogin = async (req, res) => {
    try{
         /**********  Checking null value and undefined value************/
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


         /*****************Validating Phone Number using validator Package*************/
        if(!validator.isMobilePhone(PhoneNumber)){
            return res.status(400).send({
                status : false,
                message : "Enter valid Mobile Number"
            })
        }

        /*******Checked user and created token for user***********/
        const user = await userModel.findOne({PhoneNumber})
        if(!user){
            return res.status(401).send({
              status : false, 
              message : "user Not Registerd" 
            })
        }

        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY,{expiresIn : "1d"},
        {iat : Date.now()})
        
        res.status(200).send({
          status : true,
          message: "user login successful", 
          data : {
            userId: user._id,
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

module.exports = {
    registerUser,
    userLogin,

}