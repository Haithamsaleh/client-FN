import React from 'react'
import './App.css';
import {Route,Routes} from "react-router-dom";

import Home from './components/Home';


function App() {
  return (
      <>
    <div >
      <Routes>
      <Route exact path="/" element={<Home />} />

      </Routes> 
  
    </div>
      </>
  );
}

export default App;
