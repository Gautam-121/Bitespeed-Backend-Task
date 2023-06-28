const Customer = require("../model/customerModel.js")
const ErrorHandler = require("../utils/errorHandler.js")

const customerRegister = async(req , res , next)=>{

    try{



    }catch(err){
        return next(new ErrorHandler(err , 500))
    }
}

module.exports = customerRegister