import { Routes, Route } from "react-router-dom";
import Inicio from './componentes/inicio/Inicio'
import HomePage from './componentes/homepage/HomePage';
import CreateDog from './componentes/createdog/CreateDog';
import DogDetail from './componentes/detalles/DogDetail';

import styles from './App.module.css';


function App() {
  return (

    < >
      <Routes >
        <Route path="/" element={<div className={styles.backgroundImageInicio}><Inicio/></div>} />
        <Route path="/Home" element={<div className={styles.backgroundImageHome}><HomePage/></div>} />
         <Route path="/dogdetail/:idRaza" element={<div className={styles.backgroundImageDetail}><DogDetail/></div>} />
        <Route path="/createDog" element={<div className={styles.backgroundImageDetail}><CreateDog/></div>} />

      </Routes>
    </>
  );
}

export default App;
