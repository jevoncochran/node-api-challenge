import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

import Projects from './components/Projects';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="App">
      <h1>Projects</h1>
      <Projects projects={projects} />
    </div>
  );
}

export default App;
