import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, filteredTemperament, organizarPorPeso, organizarAlfabeticamente } from '../actions/actions';

function InputBusqueda({ setCurrentPage, temp }) {
  const dispatch = useDispatch();
  const razas = useSelector((state) => state.todosLosDogs);
  const razasfiltradas = useSelector((state) => state.dogsFiltrados);
  const tem = useSelector((state) => state.temperamentosFiltrados);

  const [search, setSearch] = useState('');

  const showraza = (razasfiltradas && razasfiltradas.length) ? razasfiltradas : razas;
  const showtemp = (tem && tem.length) ? tem : temp;

  const onSearchChangeTemp = (event) => {
   // setCurrentPage(0);
    setSearch(event.target.value);
    dispatch(filteredTemperament(event.target.value));
    // Actualizar la lista de perros después del filtrado
    dispatch(getAllDogs(event.target.value));
    
  };
  const handleOrderChange = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    const selectedOption = event.target.value;
//  console.log(selectedOption);
    if (selectedOption === 'asc' || selectedOption === 'des') {
      dispatch(organizarPorPeso(selectedOption));
    } else {
      dispatch(organizarAlfabeticamente(selectedOption));
     // console.log( selectedOption);
  
      // Actualizar la lista de perros después de la ordenación
      dispatch(getAllDogs(search));
    }
  };
  

  return (
    <div className="InputBusqueda">
      <select name="ordenar" onChange={handleOrderChange}>
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
    </div>
  );
}

export default InputBusqueda;
