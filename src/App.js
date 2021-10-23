import './App.css';
import BetsService from './BetsService';
import React from 'react';

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
    <div>
      <nav>
        <div onClick={() => console.log('hi')}>+</div>
      </nav>
      <BetList />
    </div>
  );
}

class BetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: []
    };
  }

  componentDidMount() {
    console.log('BetList componentDidMount')
    BetsService.getAllBets()
      .then(data => this.updateBetsList(data));
  }

  updateBetsList(bets) {
    console.log(bets)
    this.setState({
      bets: bets
    });
  }

  render() {
    let betListItems = [];
    for (let bet of this.state.bets) {
      console.log(bet);
      betListItems.push(
        <BetListItem bet={bet}
                     key={bet.description.split(' ')[1]}/>
      );
    }
    return (
     <div>
        {betListItems}
      </div>
    );
  }
}

function BetListItem(props) {
  return (
    <div>
      <div>{props.bet.description}</div>
      <div>{props.bet.action1}</div>
      <div>{props.bet.action2}</div>
    </div>
  );
}

export default App;
