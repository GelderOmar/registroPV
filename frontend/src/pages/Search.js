import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import EditVehicle from '../components/EditVehicle';
import DeleteVehicle from '../components/DeleteVehicle';
import Modal from '../components/Modal'; // Importa el modal
import '../styles/Search.css'; // Importa el archivo CSS
import '../styles/global.css';

const Search = () => {
  const [filters, setFilters] = useState({
    dpi: '',
    plate: '',
    brand: '',
    color: '',
    agreementNumber: '',
    vehicleType: '',
  });
  const [selectedField, setSelectedField] = useState('');
  const [results, setResults] = useState([]);
  const [editVehicle, setEditVehicle] = useState(null); // Estado para el vehículo a editar
  const [deleteVehicle, setDeleteVehicle] = useState(null); // Estado para el vehículo a eliminar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const query = new URLSearchParams(filters).toString();
    try {
     /* const response = await fetch(`http://localhost:5000/api/vehicles?${query}`);*/
     const response = await fetch(`https://registropv.onrender.com/api/vehicles?${query}`);

      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleExport = () => {
    const headers = {
      vehicleType: 'Tipo',
      name: 'Nombre',
      dpi: 'DPI',
      plate: 'Placa',
      brand: 'Marca',
      color: 'Color',
      agreementNumber: 'No. Acuerdo'
    };
  
    const exportData = results.map((vehicle) => ({
      [headers.vehicleType]: vehicle.vehicleType,
      [headers.name]: vehicle.name,
      [headers.dpi]: vehicle.dpi,
      [headers.plate]: vehicle.plate,
      [headers.brand]: vehicle.brand,
      [headers.color]: vehicle.color,
      [headers.agreementNumber]: vehicle.agreementNumber
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    XLSX.writeFile(workbook, 'SearchResults.xlsx');
  };

  const openEditModal = (vehicle) => {
    setEditVehicle(vehicle);
  };

  const openDeleteModal = (vehicle) => {
    setDeleteVehicle(vehicle);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleSearch(); // Refrescar la tabla después de cerrar el modal
  };

  const handleDelete = async (vehicle) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicles/${vehicle._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setModalMessage('Eliminación exitosa');
        setIsModalOpen(true);
        setDeleteVehicle(null); // Cerrar el modal de eliminación
        handleSearch(); // Refrescar la tabla después de la eliminación
      } else {
        alert('Error al eliminar el vehículo');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSave = () => {
    setModalMessage('Edición exitosa');
    setIsModalOpen(true);
    setEditVehicle(null); // Cerrar el modal de edición
    handleSearch(); // Refrescar la tabla después de guardar
  };

  return (
    <div className="container">
      <h1>Buscar Vehículo</h1>
      <div className="grid">
        <div>
          <label>Seleccionar Campo:</label>
          <select
            value={selectedField}
            onChange={handleFieldChange}
            className="w-full p-2 border"
          >
            <option value="">--Todos--</option>
            <option value="dpi">DPI</option>
            <option value="plate">Placa</option>
            <option value="brand">Marca</option>
            <option value="color">Color</option>
            <option value="agreementNumber">No. Acuerdo</option>
          </select>

          {selectedField && (
            <div className="mt-4">
              <label>{selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}:</label>
              <input
                type="text"
                name={selectedField}
                value={filters[selectedField]}
                onChange={handleChange}
                className="w-full p-2 border"
              />
            </div>
          )}
        </div>
        <div>
          <label>Tipo de Vehículo:</label>
          <select
            name="vehicleType"
            value={filters.vehicleType}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="">--Todos--</option>
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
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mt-4">Buscar</button>

      <div className="table-container">
        <h2 className="text-xl font-bold mb-2">Resultados</h2>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>DPI</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Color</th>
              <th>No. Acuerdo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.name}</td>
                <td>{vehicle.dpi}</td>
                <td>{vehicle.plate}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.agreementNumber}</td>
                <td className="actions">
                  <button onClick={() => openEditModal(vehicle)} className="bg-yellow-500 text-white p-2 mr-2">Editar</button>
                  <button onClick={() => openDeleteModal(vehicle)} className="bg-red-500 text-white p-2">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleExport} className="bg-green-500 text-white p-2 mt-4">Exportar a Excel</button>
      </div>

      {editVehicle && (
        <EditVehicle
          vehicle={editVehicle}
          onSave={handleSave} // Pasar la función de guardar
          onClose={() => setEditVehicle(null)} // Cerrar el modal de edición
        />
      )}

      {deleteVehicle && (
        <DeleteVehicle
          vehicle={deleteVehicle}
          onDelete={handleDelete} // Pasar la función de eliminación
          onClose={() => setDeleteVehicle(null)} // Cerrar el modal de confirmación
        />
      )}
      
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default Search;
