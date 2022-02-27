import logo from './logo.svg';
import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  async function handleClick(event) {
    event.preventDefault();
    navigate("/login", { replace: true });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="button" onClick={handleClick}>
          Go to login page
        </button>
      </header>
    </div>
  );
}

export default App;
