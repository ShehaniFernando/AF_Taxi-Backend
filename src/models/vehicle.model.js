//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//MODEL CLASS SCHEMA
const VehicleSchema = new mongoose.Schema({
    code: {type:String, required:true, trim:true},
    model: {type:String, required:true, trim:true},
    type: {type:String, required:true, trim:true},
    name: {type:String, required:true, trim:true},
    value: {type:Number, required:true},

    //MANY TO MANY RELATIONSHIP - GIVE REFERENCE TO CATEGORY COLLECTION
    categories: [{type: mongoose.Schema.Types.ObjectId, required:false, ref:'categories'}]
});

//SAVE TO THE DATABASE
const Vehicle = mongoose.model('vehicles', VehicleSchema);

//EXPORT - IMPORTED IN THE CONTROLLER
module.exports = Vehicle;