import React, { useState } from 'react';
import DogsCard from '../dogscard/DogsCard';
import styles from './paginado.module.css';

function Paginado({ arraydogs, dogsPorPage = 8 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * dogsPorPage;
  const endIndex = startIndex + dogsPorPage;
  
  // Manejar la ausencia de arraydogs
  const dogsToDisplay = Array.isArray(arraydogs) ? arraydogs.slice(startIndex, endIndex) : [];

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className={styles.cardsContainer}>
      {/* Manejar arraydogs no definido */}
      {arraydogs && dogsToDisplay.length > 0 ? (
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
      <div className={styles.botonesPaginadoDispel}>
        <button onClick={prevPage} disabled={currentPage === 0}>
          Anterior
        </button>
        <button onClick={nextPage} disabled={endIndex >= (arraydogs?.length || 0)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Paginado;
