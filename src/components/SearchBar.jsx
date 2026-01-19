import { useState } from "react";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleClick = () => {
    onSearch(search);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="mb-4">
      <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
        <input
          type="text"
          className="form-control border-0"
          placeholder="Rechercher un pays ou un drapeau..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Rechercher"
        />
        <button
          className="btn btn-primary fw-bold px-4"
          type="button"
          onClick={handleClick}
          id="button-addon2"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
}

export default SearchBar;