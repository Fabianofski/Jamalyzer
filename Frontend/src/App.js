import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Jam from './components/Jam';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/jam/:id" element={<Jam/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
