import { useState } from "react";

function SearchBar({ onSearch }) {
  // state
  const [search, setSearch] = useState("");

  // comportement
  const handleClick = () => {
    onSearch(search);
  };

  // affichage
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher un pays ou un drapeau"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleClick}>Rechercher</button>
    </div>
  );
}

export default SearchBar;
