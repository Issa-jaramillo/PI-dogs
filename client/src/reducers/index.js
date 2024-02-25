import {
    OBTENER_DOGS,
    OBTENER_TEMPERAMENTOS,
    OBTENER_INFO_RAZA,
    FILTRAR_RAZA,
    FILTRAR_TEMPERAMENTO,
    ORDENAR_PESO,
    ORDENAR_ALFABETICO,
    CREAR_DOG,
    FILTRAR_POR_ORIGEN
} from '../actions/actionsTypes';


const initialState = {
    dogsFiltrados: [],  
    todosLosDogs: [],
    temperamentos: [],
    temperamentosFiltrados: [],
    detalleRaza: [],
    
   
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
                const razasFiltradasPorTemp = state.todosLosDogs.filter((e) => {
                    if (Array.isArray(e.Temperamento)) {
                        let temp = e.Temperamento.map(e => e.Nombre);
                        return temp.includes(action.payload);
                    } else if (typeof (e.Temperamento) === 'string') {
                        return e.Temperamento.includes(action.payload);
                    }
                    return false;
                });
          
                return {
                    ...state,
                    todosLosDogs: razasFiltradasPorTemp,
            };
            


            
            case ORDENAR_PESO:
            const nuevoOrden = state.todosLosDogs.slice().sort((a, b) => {
            const pesoA = parseInt(a.Peso.split(' - ')[0]);
             const pesoB = parseInt(b.Peso.split(' - ')[0]);
            return action.payload === 'asc' ? pesoA - pesoB : pesoB - pesoA;
            });

             return {
                ...state,
             todosLosDogs: nuevoOrden,
             };
            
              
            
            
            
             case ORDENAR_ALFABETICO:
              
                const nuevoOrdenAlfabetico = state.todosLosDogs.slice().sort((a, b) => {
                  const nombreA = a.Nombre || '';
                  const nombreB = b.Nombre || '';
              
                  return action.payload === 'az' ? nombreA.localeCompare(nombreB) : nombreB.localeCompare(nombreA);
                });
                return {
                  ...state,
                  todosLosDogs: nuevoOrdenAlfabetico,
                };
           
              


            case CREAR_DOG:
          
                const nuevoPerro = action.payload;  
            
                return {
                    ...state,
                    todosLosDogs: [...state.todosLosDogs, nuevoPerro],  
                    dogsFiltrados: [],  
                };

                case FILTRAR_POR_ORIGEN:
                    const filteredDogs = state.todosLosDogs.filter(dog => {
                      if (action.payload === 'API') {
                        return typeof dog.ID === 'number';
                      } else if (action.payload === 'BASE DE DATOS') {
                        return typeof dog.ID !== 'number';
                      } else {
                        return true;
                      }
                    });
                  
                    return {
                      ...state,
                      todosLosDogs: filteredDogs,
                    };
                  
        default:
            return state;
    }
}


  

export default rootReducer;
