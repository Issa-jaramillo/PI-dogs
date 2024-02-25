import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, filteredTemperament, organizarPorPeso, organizarAlfabeticamente } from '../../actions/actions';
import styles from './input.module.css';


function InputBusqueda({ setCurrentPage, temp }) {
  
  const dispatch = useDispatch();

//otengo los datos del estado de redux usando useSelector   
  const razas = useSelector((state) => state.todosLosDogs);
  const razasfiltradas = useSelector((state) => state.dogsFiltrados);
  const tem = useSelector((state) => state.temperamentosFiltrados);


//estado local para el valor del input busqueda 
  const [search, setSearch] = useState('');

//determinar que datos mostrar segun si Hay filtros aplicados  
  const showraza = (razasfiltradas && razasfiltradas.length) ? razasfiltradas : razas;
  const showtemp = (tem && tem.length) ? tem : temp;

//maneja cambios en el input de busqueda de temperamento  
  const onSearchChangeTemp = (event) => {
   // setCurrentPage(0);
    setSearch(event.target.value);
    dispatch(filteredTemperament(event.target.value));    
  };



//manejo de cambios en el selector de orden
  const handleOrderChange = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    const selectedOption = event.target.value;

//despacHa la accion correspondiente segun la opcion seleccionada    
    if (selectedOption === 'asc' || selectedOption === 'des') {
      setCurrentPage(0);
      dispatch(organizarPorPeso(selectedOption));

    } else {
      setCurrentPage(0);
      dispatch(organizarAlfabeticamente(selectedOption));
    }
  };

  
  const Alldog = () => {
    setCurrentPage(0);
    dispatch(getAllDogs())
    setSearch('');
  }

  return (
    <div className={styles.InputBusqueda}>
      <select className={styles.select} name="ordenar" onChange={handleOrderChange}>
        <option value="">Ordenar</option>
        <option value="asc">Peso Ascendente</option>
        <option value="des">Peso Descendente</option>
        <option value="az">Alfabético Ascendente</option>
        <option value="za">Alfabético Descendente</option>
      </select>

      <select name="temperamento" onChange={onSearchChangeTemp}>
        <option value="">Temperamento</option>
        {showtemp &&
          showtemp.map((e) => (
            <option key={e.ID} value={e.Nombre}>
              {e.Nombre}
            </option>
          ))}
      </select>

   <button onClick={Alldog}>Perros</button>
  

    </div>
  );
}

export default InputBusqueda;
