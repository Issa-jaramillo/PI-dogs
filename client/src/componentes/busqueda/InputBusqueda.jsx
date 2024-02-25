import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, filteredTemperament, organizarPorPeso, organizarAlfabeticamente, filtrarOrigen} from '../../actions/actions';
import styles from './input.module.css';


function InputBusqueda({ setCurrentPage, temp }) {
  
  const dispatch = useDispatch();

//otengo los datos del estado de redux usando useSelector   
  const razas = useSelector((state) => state.todosLosDogs);
  const razasfiltradas = useSelector((state) => state.dogsFiltrados);
  const tem = useSelector((state) => state.temperamentosFiltrados);


//estado local para el valor del input busqueda 
  const [search, setSearch] = useState('');
//estado para la opcion de orden selecionada
const [selectedOrder, setSelectedOrder] = useState('');

const [selectedTemperament, setSelectedTemperament] = useState('')
const [selectedOrigin, setSelectedOrigin] = useState('');


//determinar que datos mostrar segun si Hay filtros aplicados  
  const showraza = (razasfiltradas && razasfiltradas.length) ? razasfiltradas : razas;
  const showtemp = (tem && tem.length) ? tem : temp;

  
  const handleTemperamentChange = (event) => {
    setCurrentPage(0);
    const selectedTemp = event.target.value;

    // Actualiza la opción de temperamento seleccionada
    setSelectedTemperament(selectedTemp);

    dispatch(filteredTemperament(selectedTemp));
  };




  const handleOrderChange = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    const selectedOption = event.target.value;
    
    setSelectedOrder(selectedOption)

//despacHa la accion correspondiente segun la opcion seleccionada    
    if (selectedOption === 'asc' || selectedOption === 'des') {
      setCurrentPage(0);
      dispatch(organizarPorPeso(selectedOption));

    } else {
      setCurrentPage(0);
      dispatch(organizarAlfabeticamente(selectedOption));
    }
  };

  const ordenOrigen =() => {
   
  }
  
  
  const Alldog = () => {
    setCurrentPage(0);
    dispatch(getAllDogs())
    setSearch('');
    setSelectedOrder('');
    setSelectedTemperament('');
    setSelectedOrigin('');
  }

  return (
    <div className={styles.InputBusqueda}>
      <select className={styles.select} name="ordenar" value={selectedOrder} onChange={handleOrderChange}>
        <option value="">Ordenar</option>
        <option value="asc">Peso Ascendente</option>
        <option value="des">Peso Descendente</option>
        <option value="az">Alfabético Ascendente</option>
        <option value="za">Alfabético Descendente</option>
      </select>

      <select name="temperamento" value={selectedTemperament} onChange={handleTemperamentChange}>
        <option value="">Temperamento</option>
        {showtemp &&
          showtemp.map((e) => (
            <option key={e.ID} value={e.Nombre}>
              {e.Nombre}
            </option>
          ))}


      </select>
      <select name="origen" value={selectedOrigin} onChange={handleFilterByOrigin}>
      <option value="">Origen</option>
     <option value="API">API</option>
     <option value="BASE DE DATOS">Base de Datos</option>
    </select>


   <button onClick={Alldog}>Perros</button>
  

    </div>
  );
}

export default InputBusqueda;
