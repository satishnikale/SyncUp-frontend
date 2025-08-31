import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/LoginPage';
import Register from './pages/Register';
import { JoinAsGuest } from './pages/GuestPage';
import { NotFound } from './pages/NotFound';
import { AuthProvider } from './contexts/authContext';
import { Navbar } from './components/NavBar';

function App() {

  return (
    <>
      <BrowserRouter>

        <AuthProvider>
            <Navbar />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/guest' element={<JoinAsGuest />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

        </AuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App
