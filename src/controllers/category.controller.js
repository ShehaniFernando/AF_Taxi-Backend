//IMPORT - FROM MODEL
const Category = require('../models/category.model');

//CREATE THE FUNCTION - TO SAVE THE CATEGORIES IN THE DATABASE
const createCategory = async(req, res) => {
    if(req.body) {
        const category = new Category(req.body);
        //SAVE - RETURNS A PROMISE
        //AWAIT
        await category.save()
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({data:data});
        })
         .catch(error => {
            res.status(500).send({ error: error.message});
        });
    }
}

//CREATE THE FUNCTION - TO GET ALL THE CATEGORIES
const getAllCategories = async(req,res) => {
    await Category.find({}).populate('vehicles', 'code model type name value')
    .then(data => {
        //200/201 = SUCCESS STATUS
        res.status(200).send({data:data});
    })
     .catch(error => {
        res.status(500).send({ error: error.message});
    });
}

//FUNCTION - GET ALL THE CATEGORY DETAILS
const getCategoryDetails = async (req, res) => {
    if (req.params && req.params.id) {
        const category = await Category.findById(req.params.id)
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}


//CREATE THE FUNCTION - RETURN THE VEHICLES WHEN THE CATEGORY IS GIVEN
const getVehiclesForCategory = async(req, res) => {
    if(req.params && req.params.id) {
        await Category.findById(req.params.id)
        .populate('vehicles', 'code model type name value')
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({vehicles:data.vehicles});
        })
        .catch(error => {
            res.status(500).send({ error: error.message});
        });

    }
}

//CALCULATION - CALCULATE THE TRIP CHARGE
const calculateTripCost = async (req, res) => {
    if (req.body) {
        const vehicleValue = req.body.vehicleValue;
        const categoryValue = req.body.categoryValue;
        const duration = req.body.duration;

        const totalCost = duration * (vehicleValue + categoryValue);
        res.status(200).send({data: totalCost});
    }
}

//EXPORT
module.exports = {
    createCategory,
    getAllCategories,
    getCategoryDetails,
    getVehiclesForCategory,
    calculateTripCost
};
