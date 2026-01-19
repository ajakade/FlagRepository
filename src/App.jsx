import { useEffect, useState } from "react";
import { getAllCountries } from "./services/API";
import FlagCard from "./components/FlagCard";
import ColorFilter from "./components/ColorFilter";
import { getFlagColors } from "./services/flagColorService";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    getAllCountries()
      .then(data => setCountries(data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  // DEBUG : afficher les couleurs de chaque drapeau
  useEffect(() => {
    console.clear();
    countries.forEach(country => {
      console.log(
        country.name.common,
        "→",
        getFlagColors(country)
      );
    });
  }, [countries]);

  // Filtrage par couleur
  const filteredCountries = countries.filter(country => {
    if (selectedColors.length === 0) return true;

    const colors = getFlagColors(country);
    return selectedColors.every(color => colors.includes(color));
  });

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-5">
        <header className="mb-5 text-center">
          <h1 className="display-3 fw-bold text-primary mb-3">🌍 FlagRepository</h1>
          <p className="lead text-muted">Explorez les drapeaux du monde entier</p>
        </header>

        <div className="row mb-4">
          <div className="col-lg-8 offset-lg-2">
            <ColorFilter
              selectedColors={selectedColors}
              onChange={setSelectedColors}
            />
            <div className="mt-4 text-center">
              <p className="text-muted fs-5">
                <strong>{filteredCountries.length}</strong> pays trouvés
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {filteredCountries.map(country => (
                <div key={country.cca3} className="col">
                  <FlagCard country={country} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
