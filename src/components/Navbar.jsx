import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate('/', { state: { searchTerm: term } });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-container">
          <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Pokemon Logo" className="logo" />
        </Link>
        
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        
      </div>
    </nav>
  );
}

export default Navbar;