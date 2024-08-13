import React, { useState } from 'react';
import '../styles/EditVehicle.css';
import '../styles/global.css';

const EditVehicle = ({ vehicle, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: vehicle.name,
    dpi: vehicle.dpi,
    plate: vehicle.plate,
    brand: vehicle.brand,
    color: vehicle.color,
    agreementNumber: vehicle.agreementNumber,
    vehicleType: vehicle.vehicleType,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicles/${vehicle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave(); // Actualiza la lista de vehículos después de guardar
      } else {
        alert('Error al actualizar el vehículo');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">Editar Vehículo</h2>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>DPI:</label>
          <input
            type="text"
            name="dpi"
            value={formData.dpi}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>No. Placa:</label>
          <input
            type="text"
            name="plate"
            value={formData.plate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Marca:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>No. Acuerdo:</label>
          <input
            type="text"
            name="agreementNumber"
            value={formData.agreementNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tipo:</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
          >
            <option value="Mototaxi">Mototaxi</option>
            <option value="Minitaxis">Minitaxis</option>
            <option value="Microtaxis">Microtaxis</option>
            <option value="Taxi">Taxi</option>
            <option value="Fleteros">Fleteros</option>
            <option value="Microbuses">Microbuses</option>
            <option value="Buses">Buses</option>
          </select>
        </div>
        <button onClick={handleSave} className="bg-blue-500">Guardar</button>
        <button onClick={onClose} className="bg-gray-500">Cancelar</button>
      </div>
    </div>
  );
};

export default EditVehicle;
