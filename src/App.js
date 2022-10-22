import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.js';
import Register from './pages/register/Register.js'
import Chat from './pages/chat/Chat.js'
import ProtectedRoute from './components/ProtectedRoute.js';
import NotFound from './pages/404/404'
import './App.css'

function App() {
  return (
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
  );
}

export default App;
