import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './Routes/home/HomePage';
import Create from './Routes/create/CreateUser';
import Profile from './Routes/profile/UserProfile';
import Edit from './Routes/edit/EditUser';


function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
