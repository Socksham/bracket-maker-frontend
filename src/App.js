import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Manage from './pages/Manage'
import Navbar from './components/Navbar'

function App() {
    return (
        <>
            <Router>
                <div className='mx-56'>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/manage' element={<Manage />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
