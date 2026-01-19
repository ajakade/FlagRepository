import "./App.css";
import FlagList from "./components/FlagList";

function App() {
  return (
    <div className="app">
      <header>
        <h1>🌍 Les drapeaux du monde</h1>
        <p>Découvrez le monde comme jamais auparavant</p>
      </header>

      <FlagList />
    </div>
  );
}

export default App;
