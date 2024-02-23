import { useState } from "react";



const SearchBar = ({ onSearch, onSearchName }) => {
  const [name, setName] = useState('');

  const search = () => {
    // Verificar si el campo de búsqueda de raza está vacío o contiene caracteres no válidos
    if (name.trim() === '' || !/^[a-zA-Z\s]+$/.test(name.trim())) {
      alert('Por favor, ingrese un nombre de raza válido.');
      return;
    }

    // Si se proporciona un valor en el campo de búsqueda de raza, usarlo
    if (name.trim() !== '') {
      onSearch(name);
    } else {
      // De lo contrario, usar el valor del campo de búsqueda principal
      onSearch(raza);
    }

    // Limpiar los campos después de la búsqueda
   
    setName('');
  };


  return (
    <div>
      {/* Input para búsqueda por nombre de raza */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Buscar por Nombre de Raza"
      />

  
      {/* Botón para iniciar la búsqueda */}
      <button onClick={search}>Buscar perro</button>

     
     
    </div>
  );
};

export default SearchBar;
