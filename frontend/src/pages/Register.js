import React, { useState } from 'react';
import '../styles/Register.css';
import Modal from '../components/Modal'; // Importa el modal
import '../styles/global.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    dpi: '',
    plate: '',
    brand: '',
    color: '',
    agreementNumber: '',
    vehicleType: 'Mototaxi',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setIsModalOpen(true); // Abre el modal
        setFormData({
          name: '',
          dpi: '',
          plate: '',
          brand: '',
          color: '',
          agreementNumber: '',
          vehicleType: 'Mototaxi',
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Registrar Vehículo</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>DPI:</label>
            <input
              type="text"
              name="dpi"
              value={formData.dpi}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>No. Placa:</label>
            <input
              type="text"
              name="plate"
              value={formData.plate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Marca:</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Color:</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>No. Acuerdo:</label>
            <input
              type="text"
              name="agreementNumber"
              value={formData.agreementNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tipo:</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              required
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
        </div>
        <button type="submit">Registrar Vehículo</button>
      </form>
      
      {isModalOpen && <Modal message="Registro correcto" onClose={closeModal} />}
    </div>
  );
};

export default Register;
