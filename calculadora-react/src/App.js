import "./App.scss";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="App">
      <Calculator darkTheme={false} classicHeader={false} />
    </div>
  );
}

export default App;
