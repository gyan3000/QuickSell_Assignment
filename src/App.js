import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Priority from './components/Priority';
import axios from 'axios';
import Status from './components/Status';
import User from './components/User';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const ordering = "title";
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Priority data={data} ordering={ordering} />} />
          <Route path="/status" element={<Status data={data} ordering={ordering} />} />
          <Route path="/user" element={<User data={data} ordering={ordering}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
