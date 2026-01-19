import { useState, useEffect } from "react";
import ColorFilter from "./components/ColorFilter";
import FlagCard from "./components/FlagCard";
import FlagList from "./components/FlagList";
import { getAllCountries } from "./services/API";
import { getFlagColors } from "./services/flagColorService";

function App() {
  const [activeTab, setActiveTab] = useState("search"); 
  const [countries, setCountries] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    getAllCountries()
      .then(data => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
      })
      .catch(err => console.error("Erreur API:", err));
  }, []);

  useEffect(() => {
    if (selectedColors.length === 0) {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country => {
        const colors = getFlagColors(country);
        return selectedColors.every(color => colors.includes(color));
      });
      setFilteredCountries(filtered);
    }
  }, [selectedColors, countries]);

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-5">
        <header className="mb-5 text-center">
          <h1 className="display-3 fw-bold text-primary mb-3">🌍 FlagRepository</h1>
          <p className="lead text-muted">Explorez les drapeaux du monde entier</p>
        </header>

        <ul className="nav nav-tabs nav-fill mb-4" role="tablist">
          {[
            { id: "search", label: "🔍 Recherche" },
            { id: "filter", label: "🎨 Filtrer par couleur" }
          ].map(tab => (
            <li className="nav-item" key={tab.id} role="presentation">
              <button
                className={`nav-link fw-bold ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                role="tab"
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="row">
          <div className="col-12">
            {activeTab === "search" ? (
              <FlagList />
            ) : (
              <>
                <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
                  <ColorFilter selectedColors={selectedColors} onChange={setSelectedColors} />
                  <p className="mt-4 text-center text-muted fs-5">
                    <strong>{filteredCountries.length}</strong> pays trouvés
                  </p>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {filteredCountries.map(country => (
                    <div key={country.cca3} className="col">
                      <FlagCard country={country} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
