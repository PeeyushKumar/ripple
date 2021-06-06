import './App.css';
import Board from './components/Board'

function App() {

  const rows = 9;
  const cols = 20;

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
