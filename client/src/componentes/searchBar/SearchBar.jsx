import { useState } from "react";
import styles from  "./search.module.css";

const SearchBar = ({ onSearch, onSearchName }) => {
  const [name, setName] = useState('');

  const search = () => {
   
    if (name.trim() === '' || !/^[a-zA-Z\s]+$/.test(name.trim())) {
      alert('Por favor, ingrese un nombre de raza válido.');
      return;
    }

    // Si se proporciona un valor en el campo de búsqueda de raza, usarlo
    if (name.trim() !== '') 
      onSearch(name);
  
    // Limpiar los campos después de la búsqueda
    setName('');
  };


  return (
    <div className={styles.SearchBarContainer}>
 
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de Raza"
        className={styles.SearchInput}
      />

      <button onClick={search} className={styles.SearchButton}>Buscar perro</button>

     
     
    </div>
  );
};

export default SearchBar;
