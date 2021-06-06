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
          count={rows*cols}
      >
      </Board>
    </div>
  );
}

export default App;
