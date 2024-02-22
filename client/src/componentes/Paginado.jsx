import React, { useEffect, useState } from 'react';
import DogsCard from './DogsCard';

function Paginado({ arraydogs }) {
  const [animationClass, setAnimationClass] = useState('Paginado');
  const [currentPage, setCurrentPage] = useState(0);
  const dogsPerPage = 8;

  useEffect(() => {
   // ('Fetching data:', arraydogs);

    const timer = setTimeout(() => {
      setAnimationClass('Paginado');
    }, 500);

    return () => clearTimeout(timer);
  }, [arraydogs]);
  const startIndex = currentPage * dogsPerPage;
  const endIndex = startIndex + dogsPerPage;
  const dogsToDisplay = arraydogs.slice(startIndex, endIndex);


  return (
    <>
      {dogsToDisplay && dogsToDisplay.length > 0 ? (
        dogsToDisplay.map((elemento) => (
          <div key={elemento.ID}>
            <div className='glass-div2'></div>
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

    
    </>
  );
}

export default Paginado;
