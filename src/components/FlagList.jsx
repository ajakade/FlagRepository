import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FlagCard from "./FlagCard";

function FlagList() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3")
      .then((res) => res.json())
      .then((data) => {
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

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3 text-muted">Chargement des drapeaux...</p>
      </div>
    );
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {filteredCountries.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">Aucun pays trouvé</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredCountries.map((country) => (
            <div key={country.cca3} className="col">
              <FlagCard country={country} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlagList;