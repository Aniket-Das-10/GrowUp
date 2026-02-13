const mongoose = require('mongoose');

const invoiceSchma = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseName:{
        type: String,
        required: true
    },
   price:{
    type: Number,
    requied: true
   } ,
   addresh:{
    type: String,
   },
   pincode:{
    type: Number
   },
   courseId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true
   }
});

module.exports = mongoose.model("Invoices",invoiceSchma);