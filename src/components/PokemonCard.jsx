import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.code}`} className="pokemon-card">
      <div className="pokemon-image-container">
        <img 
          src={`${import.meta.env.BASE_URL}img/${pokemon.code}.png`}
          alt={pokemon.name} 
          className="pokemon-image" 
        />
      </div>
      <div className="pokemon-info">
        <div className="pokemon-number">#{pokemon.code.padStart(4, '0')}</div>
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.type.map((type, index) => (
            <span key={index} className={`type-tag ${type.toLowerCase()}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;