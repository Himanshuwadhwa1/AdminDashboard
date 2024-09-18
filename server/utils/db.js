const mongoose = require("mongoose");

async function connectingDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connection done");
    } catch (error) {
        console.log(error)
    }    
}
module.exports ={connectingDB};