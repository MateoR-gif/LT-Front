import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js'
import Chat from './pages/Chat.js'
import ProtectedRoute from './components/App/ProtectedRoute';
import Loading from './components/App/Loading';
import NotFound from './pages/404'
import './css/App.css';
import './css/Chat.css'


function App() {
  return (
    <div className='app__container'>
      <Loading>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Loading>
    </div>
  );
}

export default App;
