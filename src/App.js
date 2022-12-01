import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Managing from './pages/Managing'
import Playing from './pages/Playing'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
    return (
        <>
            <Router>
                <div className='mx-56'>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/managing/:bracketId' element={<Managing />} />
                        <Route path='/playing/:bracketId' element={<Playing />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
