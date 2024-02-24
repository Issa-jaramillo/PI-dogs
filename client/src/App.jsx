import { Routes, Route } from "react-router-dom";
import Inicio from './componentes/inicio/Inicio'
import HomePage from './componentes/homepage/HomePage';
import CreateDog from './componentes/createdog/CreateDog';
import DogDetail from './componentes/detalles/DogDetail';
import Navbar from "./componentes/Navbar";
import styles from './App.module.css';


function App() {
  return (

    < >
      
      {location.pathname !== '/' && <Navbar/>}
      <Routes >
        <Route path="/" element={<div className={styles.backgroundImageInicio}><Inicio/></div>} />
        <Route path="/Home" element={<div className={styles.backgroundImageHome}><HomePage/></div>} />
         <Route path="/dogdetail/:idRaza" element={<DogDetail />} /> 
        <Route path="/createDog" element={<CreateDog />} />

      </Routes>
    </>
  );
}

export default App;
