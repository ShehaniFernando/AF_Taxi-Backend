//API ENDPOINT
//IMPORT
const express = require('express');
const router = express.Router();
const controller = require('../controllers/vehicle.controller');

//EXPORT
module.exports = function(){
    router.post('/create', controller.createVehicle);
    router.get('/', controller.getAllVehicles);
    router.get('/:id', controller.getVehicleDetails);
    router.put("/u2/:id", controller.updateVehicle);
    router.delete("/d2/:id", controller.deleteVehicle);
    return router;
}

