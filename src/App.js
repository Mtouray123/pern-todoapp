import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';



function App() {
  const {auth} = useContext(AuthContext)
  return (
    <div>
      <Header />
     <Routes>
      {/* <Route path='/' element={}/> */}
     </Routes>
    </div>
  );
}

export default App;