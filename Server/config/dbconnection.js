const mongoose = require('mongoose');
require('dotenv').config();

const dbconnection = ()=>{
   mongoose.connect(process.env.MONGO_URL)
   .then(()=>(console.log("Data base connected successfully.")))
   .catch((err)=>{
    console.log("issue in db connection");
    console.error(err.message);
    process.exit(1);
   });
}

module.exports = dbconnection;