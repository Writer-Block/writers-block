import './App.css';
import routes from './routes'
import Header from "./components/Header/Header"

function App(props) {
  return (
    <div className="App">
      <Header/>
      {routes}
    </div>
  );
}

export default App
