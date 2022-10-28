import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js'
import Chat from './pages/Chat.js'
import ProtectedRoute from './components/App/ProtectedRoute';
import Loading from './components/App/Loading';
import NotFound from './pages/404'
import './css/App.css';
import './css/Chat.css'
import { useState } from 'react';


function App() {
  //MÉTODO QUE DEFINE EL ROL DEL USUARIO
  const [isAdmin, setIsAdmin] = useState(false)
  //MÉTODO QUE GUARDA EL ROL ORIGINAL DEL USUARIO
  const [originalRol, setOriginalRol] = useState('')
  //MÉTODO QUE EXTRAE LA INFO DE LOS COMPONENTES
  const handleExtract = (data) => {
    setOriginalRol(data)
    if(data === 'Admin'){
      setIsAdmin(true)
    }
  }
  return (
    <div className='app__container'>
      <Loading>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <Chat isAdmin={isAdmin} originalRol={originalRol}/>
              </ProtectedRoute>
            } />
            <Route path='/login' element={<Login extractInfo={handleExtract}/>} />
            <Route path='/register' element={<Register extractInfo={handleExtract}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Loading>
    </div>
  );
}

export default App;
