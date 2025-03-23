import { useState } from 'react';


function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search by name or #number..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
      <img src={`${import.meta.env.BASE_URL}img/search.png`} alt="Search" className="search-icon"/>
      </button>
    </form>
  );
}

export default SearchBar;