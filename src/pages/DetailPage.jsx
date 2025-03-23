import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { pokemons } from '../db/data';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  
  useEffect(() => {
    // Find the pokemon by ID
    const currentPokemon = pokemons.find(p => p.code === id);
    if (currentPokemon) {
      setPokemon(currentPokemon);
      
      // Get evolution chain
      const evolutionChain = currentPokemon.evolutions.map(evoCode => {
        return pokemons.find(p => p.code === String(evoCode));
      }).filter(Boolean);
      
      setEvolutions(evolutionChain);
    }
  }, [id]);
  
  if (!pokemon) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="detail-container">
         <div className="pokemon-header">
      <h1 className="pokemon-title">{pokemon.name} #{pokemon.code.padStart(4, '0')}</h1>
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back
      </button>
    </div>
      
      <div className="pokemon-detail-grid">
        <div className="pokemon-image-detail">
          <img 
            src={`${import.meta.env.BASE_URL}img/${pokemon.code}.png`}
            alt={pokemon.name} 
            className="detail-image" 
          />
        </div>
        
        <div className="pokemon-info-detail">
          <p className="pokemon-description">{pokemon.description}</p>
          
          <div className="versions">
            <h3>Versions:</h3>
            <div className="version-icons">
              <span className="version blue">
                <img src={`${import.meta.env.BASE_URL}img/version.png`} alt="Blue Version" className="version-icon"/>
              </span>
              <span className="version red">
              <img src={`${import.meta.env.BASE_URL}img/version.png`} alt="Blue Version" className="version-icon"/>

              </span>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Height</h3>
              <p>{pokemon.height.ft}' {pokemon.height.in}"</p>
            </div>
            
            <div className="stat-item">
              <h3>Category</h3>
              <p>{pokemon.category}</p>
            </div>
            
            <div className="stat-item">
              <h3>Weight</h3>
              <p>{pokemon.weight} lbs</p>
            </div>
            
            <div className="stat-item">
              <h3>Abilities</h3>
              <p>{pokemon.abilities.join(', ')}</p>
            </div>
            
            <div className="stat-item">
              <h3>Gender</h3>
              <p>
                {pokemon.gender === 'male' && '♂'}
                {pokemon.gender === 'female' && '♀'}
                {pokemon.gender === 'both' && '♂ ♀'}
              </p>
            </div>
          </div>
          
          <div className="type-section">
            <h3>Type</h3>
            <div className="type-tags">
              {pokemon.type.map((type, index) => (
                <span key={index} className={`type-tag ${type.toLowerCase()}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
          
          <div className="weaknesses-section">
            <h3>Weaknesses</h3>
            <div className="weakness-tags">
              {pokemon.weaknesses.map((weakness, index) => (
                <span key={index} className={`weakness-tag ${weakness.toLowerCase()}`}>
                  {weakness}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="stats-chart">
        <h2>Stats</h2>
        <div className="stats-bars">
          <div className="stat-bar">
            <span className="stat-label">HP</span>
            <div className="bar-container">
              <div className="bar" style={{ width: `${pokemon.stats.hp * 20}%` }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <span className="stat-label">Attack</span>
            <div className="bar-container">
              <div className="bar" style={{ width: `${pokemon.stats.attack * 20}%` }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <span className="stat-label">Defense</span>
            <div className="bar-container">
              <div className="bar" style={{ width: `${pokemon.stats.defense * 20}%` }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <span className="stat-label">Special Attack</span>
            <div className="bar-container">
              <div className="bar" style={{ width: `${pokemon.stats.specialAttack * 20}%` }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <span className="stat-label">Special Defense</span>
            <div className="bar-container">
              <div className="bar" style={{ width: `${pokemon.stats.specialDefense * 20}%` }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <span className="stat-label">Speed</span>
            <div className="bar-container">
              <div className="bar" style={{ width: `${pokemon.stats.speed * 20}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {evolutions.length > 0 && (
        <div className="evolutions-section">
          <h2>Evolutions</h2>
          <div className="evolution-chain">
            {evolutions.map((evo, index) => (
              <div key={evo.code} className="evolution-item">
                <Link to={`/pokemon/${evo.code}`} className="evolution-link">
                  <div className="evolution-image-container">
                    <img 
                      src={`${import.meta.env.BASE_URL}img/${evo.code}.png`}
                      alt={evo.name} 
                      className="evolution-image" 
                    />
                  </div>
                  <div className="evolution-info">
                    <h3>{evo.name}</h3>
                    <p>#{evo.code.padStart(4, '0')}</p>
                    <div className="evolution-types">
                      {evo.type.map((type, i) => (
                        <span key={i} className={`type-tag ${type.toLowerCase()}`}>
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
                {index < evolutions.length - 1 && (
                  <div className="evolution-arrow"><img src={`${import.meta.env.BASE_URL}img/arrow.png`} alt="Pokemon" className="arrow-icon" /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;