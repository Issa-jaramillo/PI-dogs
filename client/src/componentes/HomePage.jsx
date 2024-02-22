import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getTemperaments, filterRaza, getDogsByName } from '../actions/actions.js';
import InputBusqueda from './InputBusqueda.jsx';
import Paginado from "./Paginado.jsx";
import SearchBar from "./SearchBar.jsx";
// import CreateDog from "./CreateDog.jsx";
import { Link } from "react-router-dom";

function Homepage() {
  const allDogs = useSelector((state) => state.todosLosDogs);
  const filteredDogs = useSelector((state) => state.dogsFiltrados);
  const stateTemperaments = useSelector((state) => state.temperamentos);
  const dispatch = useDispatch();
console.log(filteredDogs);

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('ejecutado usefect');
    const fetchData = async () => {
      try {
        await dispatch(getAllDogs(filterRaza));
        await dispatch(getTemperaments());
      } catch (error) {
        console.error('Error en la obtención de datos:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const displayedDogs = search === '' ? allDogs : filteredDogs;

  const numberOfDogsPorPage = 8;
  const startIndex = currentPage * numberOfDogsPorPage;
  const endIndex = startIndex + numberOfDogsPorPage;
  const dogsToDisplay = displayedDogs.slice(startIndex, endIndex);

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

  const handleSearch = async (value) => {
    console.log(value);
    setSearch(value);
   setCurrentPage(0); // Restablece la página actual al realizar una nueva búsqueda
    try {
      await dispatch(filteredDogs(value));
    } catch (error) {
      console.error('Error en la búsqueda de perros:', error);
    }
  };
  


  const handleSearchName = (nombreRaza) => {
    setCurrentPage(0);
    dispatch(getDogsByName(nombreRaza));
  };
  console.log('filteredDogs:', filteredDogs);
console.log('displayedDogs:', displayedDogs);


  return (
    <div className="Homepage">
      <div className="botonesPaginado-dispel">
      <Link to="/createDog">Crear Perro</Link>
        <button onClick={prevPage} disabled={currentPage === 0}>Anterior</button>
        <button onClick={nextPage} disabled={endIndex >= displayedDogs.length}>Siguiente</button>
      </div>
  
      {(search && filteredDogs.length < 0) || (!search && allDogs.length < 0)  ? (
        <p>No se encontraron resultados.</p>
        
      ) : (
        
        <>
          <SearchBar  onSearch={handleSearchName}  />
          
          <InputBusqueda  temp={stateTemperaments} onSearch={handleSearch}  setCurrentPage={setCurrentPage}  />

          <Paginado arraydogs={dogsToDisplay} />
        
          
        
     
          
        </>
     
      )}
       
    </div>
  );
}

export default Homepage;
