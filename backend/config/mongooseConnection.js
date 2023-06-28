const mongoose = require("mongoose")

const connection = ()=>{

    mongoose.connect("mongodb://locahost:27017/speedtask" , {
        useNewUrlParser : true
    })
    .then(data => console.log("mongoDB is connected on" , data.connection.host))
}


module.exports = connection