const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
  const { name, dpi, plate, brand, color, agreementNumber, vehicleType } = req.body;

  try {
    const newVehicle = new Vehicle({ name, dpi, plate, brand, color, agreementNumber, vehicleType });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  const { dpi, plate, brand, color, agreementNumber, vehicleType } = req.query;

  try {
    const query = {};

    if (dpi) query.dpi = dpi;
    if (plate) query.plate = plate;
    if (brand) query.brand = brand;
    if (color) query.color = color;
    if (agreementNumber) query.agreementNumber = agreementNumber;
    if (vehicleType) query.vehicleType = vehicleType;

    const vehicles = await Vehicle.find(query);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar un vehículo
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el documento modificado en lugar del original
      runValidators: true, // Ejecuta las validaciones de nuevo en la actualización
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
 z }
};