import './App.css';
import BetsService from './BetsService';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
        <div><Link to='/f/create'>+</Link></div>
      </nav>
      <Switch> 
        <Route path='/f/create'>
          <h1>Beepbop</h1>
        </Route>
        <Route path='/'>
          <BetList />
        </Route>
      </Switch>
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
    BetsService.getAllBets()
      .then(data => {
        console.log(data)
        this.updateBetsList(data)
      });
  }

  updateBetsList(bets) {
    this.setState({
      bets: bets
    });
  }

  render() {
    let betListItems = [];
    console.log(this.state.bets)
    for (let [id, bet] of Object.entries(this.state.bets)) {
      betListItems.push(
        <BetListItem bet={bet}
                     key={id}/>
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
