import React from 'react';
import '../styles/global.css';

const DeleteVehicle = ({ vehicle, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Eliminar Vehículo</h2>
        <p>¿Estás seguro que deseas eliminar el vehículo con placa <strong>{vehicle.plate}</strong>?</p>
        <button onClick={() => onDelete(vehicle)} className="bg-red-500 text-white p-2 mr-2">Eliminar</button>
        <button onClick={onClose} className="bg-gray-500 text-white p-2">Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteVehicle;

