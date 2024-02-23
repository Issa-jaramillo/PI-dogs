import { Routes, Route } from "react-router-dom";
import Inicio from './componentes/inicio/Inicio'
import HomePage from './componentes/HomePage';
import CreateDog from './componentes/CreateDog';
import DogDetail from './componentes/DogDetail';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/createDog" element={<CreateDog />} />
        <Route path="/dogdetail/:idRaza" element={<DogDetail />} />
      </Routes>
    </div>
  );
}

export default App;
