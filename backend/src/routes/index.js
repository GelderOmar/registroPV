const express = require('express');
const VehicleController = require('../controllers/VehicleController');
const router = express.Router();


router.post('/vehicles', VehicleController.createVehicle);
router.get('/vehicles', VehicleController.getVehicles);
router.delete('/vehicles/:id', VehicleController.deleteVehicle);
// Ruta para actualizar un vehículo
router.put('/vehicles/:id', VehicleController.updateVehicle);
module.exports = router;
