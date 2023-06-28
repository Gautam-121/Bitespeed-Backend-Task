const mongoose = require("mongoose")

const connection = ()=>{

    mongoose.connect("mongodb://localhost:27017/speedTask" , {
        useNewUrlParser : true
    })
    .then(data => console.log("mongoDB is connected on" , data.connection.host))
}


module.exports = connection