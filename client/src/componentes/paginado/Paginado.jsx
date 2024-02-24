import React, { useEffect, useState } from 'react';
import DogsCard from '../dogscard/DogsCard';
import styles from './paginado.module.css';

function Paginado({ arraydogs }) {

//estado para almacenar el numero de la pagina actual
  const [currentPage, setCurrentPage] = useState(0);

//numero de perros a mostrar por pagina 
  const dogsPorPage = 8;

 
//calculo de indices de inicio y fin para los perros a mostrar en la pagina actual
  const startIndex = currentPage * dogsPorPage;
  const endIndex = startIndex + dogsPorPage;

 //array que contiene los perros a mostrar en la pagina actual 
  const dogsToDisplay = arraydogs.slice(startIndex, endIndex);



//renderizacion del componente
  return (
    <div className={styles.cardsContainer}>  
      {dogsToDisplay && dogsToDisplay.length > 0 ? (
        
        dogsToDisplay.map((elemento) => (
          <div key={elemento.ID}>
            <div className='glass-div'></div>
            <DogsCard
              id={elemento.ID}
              nombre={elemento.Nombre}
              pesomin={elemento.Peso.split(' - ')[0]}
              pesomax={elemento.Peso.split(' - ')[1]}
              temperamentos={elemento.Temperamento}
              imagen={elemento.Imagen}
              
            />
          </div>
          
        ))
      ) : (
        <p>No hay perros</p>
      )}

  
      </div>
  );
}

export default Paginado;
