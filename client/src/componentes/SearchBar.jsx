import { useState } from "react";



const SearchBar = ({ onSearch, onSearchNombreRaza }) => {
  const [nombreRaza, setNombreRaza] = useState('');

  const search = () => {
    // Verificar si el campo de búsqueda de raza está vacío o contiene caracteres no válidos
    if (nombreRaza.trim() === '' || !/^[a-zA-Z\s]+$/.test(nombreRaza.trim())) {
      alert('Por favor, ingrese un nombre de raza válido.');
      return;
    }

    // Si se proporciona un valor en el campo de búsqueda de raza, usarlo
    if (nombreRaza.trim() !== '') {
      onSearchNombreRaza(nombreRaza);
    } else {
      // De lo contrario, usar el valor del campo de búsqueda principal
      onSearch(raza);
    }

    // Limpiar los campos después de la búsqueda
   
    setNombreRaza('');
  };

  return (
    <div>
      {/* Input para búsqueda por nombre de raza */}
      <input
        type="text"
        value={nombreRaza}
        onChange={(e) => setNombreRaza(e.target.value)}
        placeholder="Buscar por Nombre de Raza"
      />

  
      {/* Botón para iniciar la búsqueda */}
      <button onClick={search}>Buscar perro</button>
    </div>
  );
};

export default SearchBar;
