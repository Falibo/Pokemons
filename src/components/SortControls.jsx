function SortControls({ sortBy, onSortChange }) {
    return (
      <div className="sort-controls">
        <label htmlFor="sort-select">Sort by:</label>
        <select 
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="number">Number</option>
          <option value="name">Name</option>
        </select>
      </div>
    );
  }
  
  export default SortControls;