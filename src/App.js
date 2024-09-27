import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Dashboard from './components/user/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Pagenotfound />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}


function Pagenotfound() {
  return (
    <div>
      <h1> 404 page not found</h1>
      <h5>
        <Link to="/">Home</Link>
      </h5>
    </div>
  );
}

export default App;
