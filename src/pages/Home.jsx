import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PokemonList from '../components/PokemonList';

function Home() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPowerful, setShowPowerful] = useState(false);
  
  useEffect(() => {
    // Check if there's a search term in the location state
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
    
    // Check if there's a sort parameter in the URL
    const params = new URLSearchParams(location.search);
    const sortParam = params.get('sort');
    
    // Set showPowerful based on URL parameter
    if (sortParam === 'power') {
      setShowPowerful(true);
    } else {
      setShowPowerful(false);
    }
  }, [location]);
  
  return (
    <div className="home-container">
      <h1 className="page-title">
        {showPowerful ? 'Powerful Pokémon' : 'Pokémon Collection'}
      </h1>
      <PokemonList searchTerm={searchTerm} showPowerful={showPowerful} />
    </div>
  );
}

export default Home;