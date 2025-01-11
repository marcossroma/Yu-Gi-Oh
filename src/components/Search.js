import React, { useState } from 'react';
import '../App.css'; // Importando a folha de estilos para o componente

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input 
      type="text" 
      value={searchTerm} 
      onChange={handleInputChange} 
      placeholder="Search for a card..." 
      className="search-input" // Adicionando a classe para estilizar
    />
  );
};

export default Search;
