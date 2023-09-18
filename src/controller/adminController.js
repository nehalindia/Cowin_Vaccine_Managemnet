const adminModel = require('../model/adminModel')
const userModel = require('../model/userModel')
const slotModel = require('../model/slotModel')
const { isValid,isValidRequestBody } = require('../validation/validator');
const validator = require('validator');
const jwt = require('jsonwebtoken')
require('dotenv').config


/************ Admin Login API **************/
const adminLogin = async function(req,res){
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

/******* Get The detail of Registerd User **************/
const getUser = async function(req, res){
    try{
        /********* Validating admin *********/
        const admin = await adminModel.findById(req.userId)
        if(!admin){
            return res.status(403).send({
                status: false,
                message : "Your not a Admin"
            })
        }

        /************ Selecting all Registerd User ************/
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

/*************** Filter user List  **************/
const filterUser = async function(req,res){
    try{
        /********* Validating admin *********/
        const admin = await adminModel.findById(req.userId)
        if(!admin){
            return res.status(403).send({
                status: false,
                message : "Your not a Admin"
            })
        }
        

        /********** Creating filter on the base of User Input **************/
        let filter = {}
        let {Age, Pincode, Vaccination} = req.query
        if(Age){
            filter.Age = Age
        }
        if(Pincode){
            filter.Pincode = Pincode
        }
        if(Vaccination){
            filter.Vaccination = Vaccination
        }

        const user = await userModel.find(filter)

        res.status(200).send({
            status : true,
            message : "Success",
            data : user
        })

    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }

}

/********** get details of all registerd slot ***************/
const getSlot = async function(req,res){
    try{
        /********* Validating admin *********/
        const admin = await adminModel.findById(req.userId)
        if(!admin){
            return res.status(403).send({
                status: false,
                message : "Your not a Admin"
            })
        }

        const slot = await slotModel.find(req.body).populate('userId')
        
        res.status(200).send({
            status: true,
            message: "Slot Data fetched",
            Vaccine_Data: slot
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
    getUser,
    getSlot,
    filterUser
}