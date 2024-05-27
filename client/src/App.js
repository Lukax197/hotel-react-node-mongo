import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App" style={{overflowX: 'hidden'}}>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen/>}/>
          <Route path="/book/:roomid/:fromDate/:toDate" element={<Bookingscreen/>}/>
          <Route path="/register" element={<Registerscreen/>}/>
          <Route path="/login" element={<Loginscreen/>}/>
          <Route path="/profile" element={<Profilescreen/>}/>
          <Route path="/" element={<Landingscreen/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
