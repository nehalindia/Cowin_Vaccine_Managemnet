const userModel = require('../model/userModel')
const slotModel = require('../model/slotModel')


const availableSlot = async function(req,res){
    try{
       
        const today = new Date();

        // const tomorrowDateFormatted = tomorrow.toDateString();
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear();
        // const slotDate = `${dd}-${mm}-${yyyy}`;
        // console.log(slotDate)

        const { date } = req.body
        const date1 = date.split("-")
        // console.log(date1)

        if(date1[2] != yyyy || date1[1] != mm || date1[0] <= dd){
            return res.status(400).send({
                status : false, 
                message : "Not Valid Date"
            })
        }
        
        const data = await slotModel.find({date : date})
        console.log(typeof data)
        if(data.length == 140){
            return res.status(200).send({
                status : false, 
                message : "Slot not Available"
            })
        }



        res.status(200).send({
            status: true,
            message: "Slot Data fetched",
            Count : count
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

}