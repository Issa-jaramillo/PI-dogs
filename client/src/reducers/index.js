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
   // dogsActuales: [],
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
              console.log(nuevoOrdenAlfabetico);
              console.log(state);
                return {
                  ...state,
                  todosLosDogs: nuevoOrdenAlfabetico,
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
