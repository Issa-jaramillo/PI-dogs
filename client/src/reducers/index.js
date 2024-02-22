import {
    OBTENER_DOGS,
    OBTENER_TEMPERAMENTOS,
    OBTENER_INFO_RAZA,
    FILTRAR_RAZA,
    FILTRAR_TEMPERAMENTO,
    ORDENAR_PESO,
    ORDENAR_ALFABETICO,
    CREAR_DOG
} from '../actions/actionsTypes';

// Definir el estado inicial
const initialState = {
    dogsFiltrados: [],  // Renombrado para mayor claridad
    todosLosDogs: [],
    temperamentos: [],
    temperamentosFiltrados: [],
    detalleRaza: [],
    //dogsActuales: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case OBTENER_DOGS:
            // Acción para obtener todas las razas de perros
            return {
                ...state,
                todosLosDogs: action.payload,
            };

        case OBTENER_TEMPERAMENTOS:
            // Acción para obtener todos los temperamentos y ordenar alfabéticamente
            return {
                ...state,
                temperamentos: action.payload.sort((a, b) => a.Nombre.localeCompare(b.Nombre)),
            };

        case OBTENER_INFO_RAZA:
            // Acción para obtener detalles de una raza de perro por ID
            return {
                ...state,
                detalleRaza: action.payload || [], // Si no hay datos, establecer como un array vacío
            };

        case FILTRAR_RAZA:
            // Acción para filtrar temperamentos únicos
            const temperamentosUnicos = [...new Set(state.todosLosDogs.map(e => e.Temperamento).flat())];
            const temperamentosFiltrados = state.temperamentos.filter(e => temperamentosUnicos.includes(e.Nombre));

            return {
                ...state,
                temperamentosFiltrados,
            };

        case FILTRAR_TEMPERAMENTO:
            // Acción para filtrar razas por temperamento
            const razasFiltradasPorTemp = state.todosLosDogs.filter((e) => {
                if (typeof (e.Temperamento) === 'string') {
                    return e.Temperamento.includes(action.payload);
                }
                if (Array.isArray(e.Temperamento)) {
                    let temp = e.Temperamento.map(e => e.Nombre);
                    return temp.includes(action.payload);
                }
            });
            console.log('temperamentosFiltrados:', state.temperamentosFiltrados);
            console.log('dogsFiltrados:', razasFiltradasPorTemp);
            return {
                ...state,
                dogsFiltrados: razasFiltradasPorTemp,
            };
             
            case ORDENAR_PESO:
                console.log(state);
                console.log(action.payload);
                const dogsOrdenadosPorPeso = [...state.dogsFiltrados];
           
                dogsOrdenadosPorPeso.sort((a, b) => {
                  const pesoA = a.PesoMin || a.PesoMax;
                  const pesoB = b.PesoMin || b.PesoMax;
              
                  return action.payload === 'asc' ? pesoA - pesoB : pesoB - pesoA;
                });
              console.log(dogsOrdenadosPorPeso);
                return {
                  ...state,
                  dogsFiltrados: dogsOrdenadosPorPeso,
                };
              

        case ORDENAR_ALFABETICO:
      // Acción para ordenar alfabéticamente ascendente o descendente
const dogsOrdenadosPorNombre = [...(state.dogsFiltrados ?? state.todosLosDogs)];

dogsOrdenadosPorNombre.sort((a, b) => {
    // Proporcionar un valor predeterminado (cadena vacía) si a.Nombre o b.Nombre es undefined
    const nombreA = a.Nombre || '';
    const nombreB = b.Nombre || '';

    // Comparar y ordenar alfabéticamente según la opción seleccionada
    return action.payload === 'az' ? nombreA.localeCompare(nombreB) : nombreB.localeCompare(nombreA);
});

return {
    ...state,
    dogsFiltrados: dogsOrdenadosPorNombre,
};


            case CREAR_DOG:
                // Acción para crear una nueva raza de perro
                const nuevoPerro = action.payload;  
            
                return {
                    ...state,
                    todosLosDogs: [...state.todosLosDogs, nuevoPerro],  // Agregar el nuevo perro a la lista de todos los perros
                    dogsFiltrados: [],  // Reiniciar la lista filtrada, ya que se ha agregado un nuevo perro
                };
            

        default:
            return state;
    }
}

export default rootReducer;
