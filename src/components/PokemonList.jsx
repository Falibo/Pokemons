import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import SortControls from './SortControls';
import { pokemons } from '../db/data';

function PokemonList({ searchTerm = '' }) {
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [sortBy, setSortBy] = useState('number');
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  // First effect runs only once on mount to load all pokemons
  useEffect(() => {
    // Sort initially by number (your default)
    const sortedPokemons = [...pokemons].sort((a, b) => parseInt(a.code) - parseInt(b.code));
    setFilteredPokemons(sortedPokemons);
    setIsInitialRender(false);
  }, []);
  
  // This effect handles filtering and sorting when those dependencies change
  useEffect(() => {
    // Skip on initial render since we're handling that in the first effect
    if (isInitialRender) return;
    
    let result = pokemons;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchLower) || 
        pokemon.code === searchTerm
      );
    }
    
    // Apply sorting
    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'number') {
      result = [...result].sort((a, b) => parseInt(a.code) - parseInt(b.code));
    }
    
    setFilteredPokemons(result);
  }, [searchTerm, sortBy, isInitialRender]);
  
  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    setFilteredPokemons([pokemons[randomIndex]]);
  };
  
  return (
    <div className="pokemon-list-container">
      <div className="controls-container">
        <SortControls sortBy={sortBy} onSortChange={setSortBy} />
        <button onClick={handleSurpriseMe} className="surprise-button">
        <img src={`/Pokemons/img/shuffle.png`} alt="Shuffle" className="shuffle-icon" />
          Surprise Me!
        </button>
      </div>
      
      <div className="pokemon-grid">
        {filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.code} pokemon={pokemon} />
        ))}
        
        {filteredPokemons.length === 0 && (
          <p className="no-results">No Pokémon found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default PokemonList;