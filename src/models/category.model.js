//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//MODEL CLASS SCHEMA
const CategorySchema = new mongoose.Schema({
    category: {type:String, required:true, trim:true},
    value: {type:Number, required:true},

    //MANY TO MANY RELATIONSHIP - GIVE REFERENCE TO VEHICLE COLLECTION
    vehicles: [{type: mongoose.Schema.Types.ObjectId, required:false, ref:'vehicles'}]
});

//SAVE TO THE DATABASE
const Category = mongoose.model('categories', CategorySchema);

//EXPORT - IMPORTED IN THE CONTROLLER
module.exports = Category;