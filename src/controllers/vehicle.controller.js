//IMPORT - FROM MODEL
const Vehicle = require('../models/vehicle.model');

//CREATE THE FUNCTION - TO SAVE THE VEHICLES IN THE DATABASE
const createVehicle = async(req, res) => {
    if(req.body) {
        const vehicle = new Vehicle(req.body);
        //save
        vehicle.save()
        .then(data => {
            //200/201 = SUCCESS STATUS
            res.status(200).send({data:data});
        })
         .catch(error => {
            res.status(500).send({ error: error.message});
        });
    }
}

//FUNCTION - GET THE VEHICLES
const getAllVehicles = async(req,res) => {
    await Vehicle.find({})
    .then(data => {
        //200/201 = SUCCESS STATUS
        res.status(200).send({data:data});
    })
     .catch(error => {
        res.status(500).send({ error: error.message});
    });
}

//FUNCTION - GET ALL THE VEHICLE DETAILS
const getVehicleDetails = async (req, res) => {
    if (req.params && req.params.id) {
        const vehicle = await Vehicle.findById(req.params.id)
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

//DELETE - RELATED TO THE ID
const deleteVehicle = async(req, res) => {
    const id = req.params.id;
  
    Vehicle.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Vehicle was not found! Unsuccessful deletion of Vehicle with id=${id}.`
          });
        } else {
          res.send({
            message: "Successfully deleted the Vehicle!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Sorry! Cannot delete the Vehicle with id=" + id
        });
      });
  };
  
  //UPDATE - SPECIFIED TO THE ID
  const updateVehicle = async(req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data cannot be Empty for the Update!"
      });
    }
  
    const id = req.params.id;
  
    Vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Vehicle was not found! Unsuccessful updation of Vehicle with id=${id}.`
          });
        } else res.send({ message: "Successfully updated the Vehicle!" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Sorry! Cannot delete the Vehicle with id=" + id
        });
      });
  };

//EXPORT
module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleDetails,
    updateVehicle,
    deleteVehicle
};
