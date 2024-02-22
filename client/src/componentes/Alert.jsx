import React from 'react';


function Alert({ error }) {
    // Desestructura las propiedades específicas de 'error'
    const { nombre, alturamin, alturamax, pesomin, pesomax, años_de_vida } = error || {};

    // se utiliza el operador ternario para asignar el mensaje
    const message = error
        ? '¡No tiene los valores correctos!'
        : 'Se creó exitosamente el perro ';



    return (
        
            <div>
                <h1>{message}</h1>
            </div>
        
    );
}

export default Alert;
