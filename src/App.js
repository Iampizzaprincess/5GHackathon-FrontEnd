import logo from './logo.svg';
import './App.css';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <BetList />
  );
}

function BetList() {
  let bets = [];
  for (let i = 0; i < 4; i++) {
    bets.push(<BetListItem />)
  }
  return (
    <div>
      {bets}
    </div>
  );
}

function BetListItem() {
  return (
    <div>
      <div>BetListing</div>
      <div>Like</div>
      <div>Dislike</div>
    </div>
  );
}

export default App;
