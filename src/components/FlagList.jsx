import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function FlagList() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((res) => res.json())
      .then((data) => {
        // 🔹 TRIER ALPHABÉTIQUEMENT
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sorted);
        setFilteredCountries(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (value) => {
    if (!value.trim()) {
      setFilteredCountries(countries);
      return;
    }

    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCountries(result);
  };

  if (loading) return <p className="loading">Chargement...</p>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className="flag-grid">
        {filteredCountries.length === 0 ? (
          <p>Aucun pays trouvé</p>
        ) : (
          filteredCountries.map((country, index) => (
            <div className="flag-card" key={index}>
              <img src={country.flags.png} alt={country.name.common} />
              <p>{country.name.common}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FlagList;
