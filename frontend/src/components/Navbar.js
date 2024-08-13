import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white">Home</Link>
        <Link to="/register" className="text-white">Registrar</Link>
        <Link to="/search" className="text-white">Buscar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
