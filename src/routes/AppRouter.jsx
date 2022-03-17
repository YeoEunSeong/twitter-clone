import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Auth from '../components/Auth';

const AppRouter = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path='/'  element={isLoggedIn ? <Home/> : <Auth/>}/>
      </Routes>
    </Router>
  )

}

export default AppRouter;