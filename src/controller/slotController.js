const userModel = require('../model/userModel')
const slotModel = require('../model/slotModel')
const { isValid,isValidRequestBody } = require('../validation/validator');

/*************** Availibility of Slot **************/
const availableSlot = async function(req,res){
    try{       
        // const today = new Date();
        // const dd = String(today.getDate()).padStart(2, '0')
        // const mm = String(today.getMonth() + 1).padStart(2, '0')
        // const yyyy = today.getFullYear();
        // const slotDate = `${dd}-${mm}-${yyyy}`;

        /**********  Checking null value and undefined value************/
        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }
        const { date } = req.body
        if(!isValid(date)){
            return res.status(400).send({
                status: false,
                message: "please provide valid date"
            })
        }
        
        /******* Validating the Date with vaccination Drive ************/
        const date1 = date.split("-")
        if(date1[2] != '2021' || date1[1] != '06' || date1[0] < '0' || date1[0] > '31'){
            return res.status(400).send({
                status : false, 
                message : "Not Valid Date"
            })
        }
        
        const count = await slotModel.find({date : date}).count()
        if(count == 140){
            return res.status(200).send({
                status : false, 
                message : "Slot not Available"
            })
        }


        /************ Checking available time slot on particular date ***************/
        let arr = []
        let checkSlot = await slotModel.find({date:date, time : "10:00" }).count()
        if(checkSlot < 10) arr.push("10:00")
        checkSlot = await slotModel.find({date:date, time : "10:30" }).count()
        if(checkSlot < 10) arr.push("10:30")
        checkSlot = await slotModel.find({date:date, time : "11:00" }).count()
        if(checkSlot < 10) arr.push("11:00")
        checkSlot = await slotModel.find({date:date, time : "11:30" }).count()
        if(checkSlot < 10) arr.push("11:30")
        checkSlot = await slotModel.find({date:date, time : "12:00" }).count()
        if(checkSlot < 10) arr.push("12:00")
        checkSlot = await slotModel.find({date:date, time : "12:30" }).count()
        if(checkSlot < 10) arr.push("12:30")
        checkSlot = await slotModel.find({date:date, time : "01:00" }).count()
        if(checkSlot < 10) arr.push("01:00")
        checkSlot = await slotModel.find({date:date, time : "01:30" }).count()
        if(checkSlot < 10) arr.push("01:30")
        checkSlot = await slotModel.find({date:date, time : "02:00" }).count()
        if(checkSlot < 10) arr.push("02:00")
        checkSlot = await slotModel.find({date:date, time : "02:30" }).count()
        if(checkSlot < 10) arr.push("02:30")
        checkSlot = await slotModel.find({date:date, time : "03:00" }).count()
        if(checkSlot < 10) arr.push("03:00")
        checkSlot = await slotModel.find({date:date, time : "03:30" }).count()
        if(checkSlot < 10) arr.push("03:30")
        checkSlot = await slotModel.find({date:date, time : "04:00" }).count()
        if(checkSlot < 10) arr.push("04:00")
        checkSlot = await slotModel.find({date:date, time : "04:30" }).count()
        if(checkSlot < 10) arr.push("04:30")


        res.status(200).send({
            status: true,
            message: "Slot Data fetched",
            Available_Slot : arr
        })
    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}


/******** Register the Slot *************/
const registerSlot = async (req,res) => {
    try{
        /**********  Checking null value and undefined value************/
        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }
        let { date, time, dose} = req.body
        if(!isValid(date) || !isValid(time) || !isValid(dose)){
            return res.status(400).send({
                status: false,
                message: "please provide valid detail"
            })
        }

        /******* Validating the Date with vaccination Drive ************/
        const date1 = date.split("-")
        if(date1[2] != '2021' || date1[1] != '06' || date1[0] < '0' || date1[0] > '31'){
            return res.status(400).send({
                status : false, 
                message : "Not Valid Date"
            })
        }
        const count = await slotModel.find({date : date}).count()
        if(count == 140){
            return res.status(200).send({
                status : false, 
                message : "Slot not Available"
            })
        }

        /*********** Checking valid request of Dose *****************/
        let vaccine = await userModel.findById(req.userId)

        if(vaccine.vaccination === "none" && dose != "1st"){
            return res.status(200).send({
                status : false, 
                message : "You must register for 1st dose"
            })
        }

        if(vaccine.vaccination === "All Completed"){
            return res.status(200).send({
                status : false, 
                message : "Your dose completed"
            })
        }

        if(vaccine.vaccination === "First dose completed" && dose != "1st"){
            return res.status(200).send({
                status : false, 
                message : "Your 1st dose completed"
            })
        }

        /********** Registered the time slot for vaccine *****************/
        let checkSlot = await slotModel.find({date:date, time : time }).count()
        if(checkSlot < 10){
            req.body.userId = req.userId
        }

        const registerdSlot = await slotModel.create(req.body)

        res.status(201).send({
            status: true,
            message : "Slot registerd",
            Slot : registerdSlot
        })

    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}


/******** Update Registerd Slot *************/
const updateSlot = async function(req,res){
    try{
        /**********  Checking null value and undefined value************/
        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }

        let { date, time } = req.body
        if(!isValid(date) || !isValid(time)){
            return res.status(400).send({
                status: false,
                message: "please provide valid detail"
            })
        }

        /******* Validating the Date with vaccination Drive ************/
        const date1 = date.split("-")
        if(date1[2] != '2021' || date1[1] != '06' || date1[0] < '0' || date1[0] > '31'){
            return res.status(400).send({
                status : false, 
                message : "Not Valid Date"
            })
        }
        const count = await slotModel.find({date : date}).count()
        if(count == 140){
            return res.status(200).send({
                status : false, 
                message : "Slot not Available"
            })
        }

        /************ Updated the time and date after chceking availability *************/
        let registerdSlot = await slotModel.findOne({userId:req.userId})

        let checkSlot = await slotModel.find({date:date, time : time }).count()
        if(checkSlot < 10){
            registerdSlot.date = date
            registerdSlot.time = time
        }
        else{
            return res.status(400).send({
                status : false, 
                message : "Slot not Available"
            })
        }

        let data = await registerdSlot.save()

        res.status(201).send({
            status : true,
            message: "slot updated",
            Slot : data
        })


    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}

module.exports = {
    availableSlot,
    registerSlot,
    updateSlot
}