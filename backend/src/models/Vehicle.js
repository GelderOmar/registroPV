const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dpi: { type: String, required: true }, // Elimina `unique: true`
  plate: { type: String, required: true }, // Elimina `unique: true`
  brand: { type: String, required: true },
  color: { type: String, required: true },
  agreementNumber: { type: String, required: true }, // Elimina `unique: true`
  vehicleType: { type: String, required: true, enum: ['Mototaxi', 'Minitaxis', 'Microtaxis', 'Taxi', 'Fleteros', 'Microbuses', 'Buses'] },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
