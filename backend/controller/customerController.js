const Customer = require("../model/customerModel.js")
const ErrorHandler = require("../utils/errorHandler.js")

const customerRegister = async(req , res , next)=>{

    try{

        const {email , phoneNumber} = req.body

        if(!email && !phoneNumber){
            return next(new ErrorHandler("Please send at least one data" , 400))
        }

        let customerDetail = {
            email : email ? email : null ,
            phoneNumber : phoneNumber ? phoneNumber : null
        }

        const contactUserData = await Customer.findOne({email : email , phoneNumber : phoneNumber})

        if(contactUserData){
            return next(new ErrorHandler(`Contact already created with same phoneNumber and email`))
        }

        const data = await Customer.find({$or :[{email : email ? email : ""} , {phoneNumber : phoneNumber ? phoneNumber : "" }]})

        if(data.length === 0){

            customerDetail.linkPrecedence = "primary" 

            const customer = await Customer.create(customerDetail)

            return res.status(200).json({
                
                contact :{
                    primaryContatctId : customer._id,
                    emails : customer.email ? [customer.email] : [],
                    phoneNumbers : customer.phoneNumber ? [customer.phoneNumber] : [], 
                    secondaryContactIds : [] 
                }
            })
        }

        const allEmail = new Set()
        const allPhoneNumber = new Set()
        const allSecondary = []
        let count = 0

        data.forEach(val => {

            if(val.email){
                allEmail.add(val.email)
            }

            if(val.phoneNumber){
                allPhoneNumber.add(val.phoneNumber)
            }

            if(val.linkPrecedence === "primary" && count === 0){
                customerDetail.linkedId = val._id
                count++
            }
            if(val.linkPrecedence === "secondary" && count === 0){
                customerDetail.linkedId = val.linkedId
                count++
            }
            if(val.linkPrecedence === "secondary"){
                allSecondary.push(val._id)
            }
        })

        customerDetail.linkPrecedence = "secondary"

        if(phoneNumber) allPhoneNumber.add(phoneNumber)
        if(email) allEmail.add(email)

        const customer = await Customer.create(customerDetail)

        allSecondary.push(customer._id)

        res.status(200).json({
            contact :{
                primaryContatctId : customerDetail.linkedId,
                emails : [...allEmail.values()],
                phoneNumbers : [...allPhoneNumber.values()],
                secondaryContactIds : allSecondary
            }
        })

    }catch(err){
        return next(new ErrorHandler(err , 500))
    }
}

module.exports = {customerRegister}