import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.js';
import Register from './pages/register/Register.js'
import Chat from './pages/chat/Chat.js'
import ProtectedRoute from './components/ProtectedRoute.js';
import NotFound from './pages/404/404'
import './App.css'
import Loading from './components/Loading.js';

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
