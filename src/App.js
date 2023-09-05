
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Home from './component/home/Home';
import ThankYou from './component/thanks/ThankYou';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Home />} />
          <Route path='/thank' element={<ThankYou />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
