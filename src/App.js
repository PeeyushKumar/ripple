import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Board from './components/Board'

function App() {

  const rows = 15;
  const cols = 36;

  return (
    <div className="App">
      <Board 
          rows={rows}
          cols={cols}
          noOfTiles={rows*cols}
      >
      </Board>
    </div>
  );
}

export default App;
