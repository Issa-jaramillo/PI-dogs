import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDogs,
  getTemperaments,
  getDogsByName,
 // filtrarOrigen,
 // filterRaza,
} from '../../actions/actions.js';
import InputBusqueda from '../busqueda/InputBusqueda.jsx';
import Paginado from '../paginado/Paginado.jsx';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

function Homepage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  const allDogs = useSelector((state) => state.dogs);
  console.log(allDogs);
  const stateTemperaments = useSelector((state) => state.temperamentos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllDogs());
        await dispatch(getTemperaments());
      } catch (error) {
        console.error('Error en la obtención de datos:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSearchName = (nombreRaza) => {
    setCurrentPage(0);
    dispatch(getDogsByName(nombreRaza));
  };

  const handleSearch = async (value) => {
    setSearch(value);
    setCurrentPage(0);
    try {
      await dispatch(getAllDogs(value))
    } catch (error) {
      console.error('Error en la búsqueda de perros:', error);
    }
  };

  return (
    <div className=''>
      <div className={`${styles.contenedorPrincipal} ${styles.botonesPaginadoDispel}`}>
        <div className={styles.botonesPaginadoDispel}>
          <Link to='/'>🔒</Link>
          <Link to='/createDog'>Crear Perro</Link>
        </div>
        <div className={styles.searchBarsContainer}>
          <InputBusqueda temp={stateTemperaments} onSearch={handleSearch} setCurrentPage={setCurrentPage} />
          <SearchBar onSearch={handleSearchName}  />
        </div>
      </div>
      <Paginado arraydogs={allDogs} dogsPorPage={8} />
    </div>
  );
}

export default Homepage;
