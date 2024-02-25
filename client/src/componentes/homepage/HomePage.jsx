import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getTemperaments, filterRaza, getDogsByName } from '../../actions/actions.js';
import InputBusqueda from '../busqueda/InputBusqueda.jsx';
import Paginado from '../paginado/Paginado.jsx';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from "react-router-dom";
import styles from './home.module.css';




function Homepage() {
//estado local para la pagina actual y la cadena de busqueda   
 const [currentPage, setCurrentPage] = useState(0);
 const [search, setSearch] = useState('');

//obtener datos del estado global con useSelector 
  const allDogs = useSelector((state) => state.todosLosDogs);
  const filteredDogs = useSelector((state) => state.dogsFiltrados);
  const stateTemperaments = useSelector((state) => state.temperamentos);

 
  const dispatch = useDispatch();



//efecto secundario para obtener datos iniciales al cargar el componente 
  useEffect(() => {
 
    const fetchData = async () => {
      try {
//obtener todos los perros y temperamentos
        await dispatch(getAllDogs(filterRaza));
        await dispatch(getTemperaments());
      } catch (error) {
        console.error('Error en la obtención de datos:', error);
      }
    };

    fetchData();
  }, [dispatch]);


//funciones para navegar a la siguiente y anterior pagina  
  const nextPage = () => {
    if (endIndex < displayedDogs.length) {
     setCurrentPage(currentPage + 1);
   }
 };

  const prevPage = () => {
   if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
   }
 };



  const handleSearchName = (nombreRaza) => {
   setCurrentPage(0);
    dispatch(getDogsByName(nombreRaza));
};



//funcion para manejar la busqueda por raza y actualizar pa pagina actual  
   const handleSearch = async (value) => {
  
    setSearch(value);
   setCurrentPage(0); // Restablece la página actual al realizar una nueva búsqueda
  try {
//filtrar los perros por raza      
    await dispatch(filteredDogs(value));
  } catch (error) {
    console.error('Error en la búsqueda de perros:', error);
  }
 };

//logica para la paginacion y mostrado de resultado
  const displayedDogs = search === '' ? allDogs : filteredDogs;

  const numberOfDogsPorPage = 8;
  const startIndex = currentPage * numberOfDogsPorPage;
  const endIndex = startIndex + numberOfDogsPorPage;
  const dogsToDisplay = displayedDogs.slice(startIndex, endIndex);

  

  return (
    <div className=''>
    <div className={`${styles.contenedorPrincipal} ${styles.botonesPaginadoDispel}`}> 
    <div className={styles.botonesPaginadoDispel} >
      <Link to='/'>🔒</Link>
      <Link to="/createDog">Crear Perro</Link>
      <button onClick={prevPage} disabled={currentPage === 0}>Anterior</button>
      <button onClick={nextPage} disabled={endIndex >= displayedDogs.length}>Siguiente</button>
    </div>

  
      
      <div className={styles.searchBarsContainer}>
      <InputBusqueda temp={stateTemperaments} onSearch={handleSearch} setCurrentPage={setCurrentPage} /> 
        <SearchBar onSearch={handleSearchName} />
        </div>
    
        </div>
      
      <Paginado arraydogs={dogsToDisplay} />
  </div>
);
}

export default Homepage;
