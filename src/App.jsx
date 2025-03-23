import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<DetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;