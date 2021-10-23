import './App.css';
import BetsService from './BetsService';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import thumbUp_ from './thumbUp_.png';


function App() {
  
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
  // format bet list item here 
  return (
      <div className="betItem">
        <div className="lead">{props.bet.description}</div>
        <div className="flex-grid">
          <div className="col">
              Moiz Rasheed
          </div>
          <div className="col">
            <button type = "button" className="btn btn-success" 
              onClick={() => console.log('Liked')}> 
                <img src={thumbUp_} width ="20%" ></img> 
              </button>
          </div>
          <div className="col">
            <div>
              <button type="button" className="btn btn-primary">
                {props.bet.action1}
              </button>
            </div>
            <div>
              <button type="button" className="btn btn-primary">
                {props.bet.action2}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;

//<div className="App">
//</div><div class="lead"> "I bet this thing happens" </div>
//<div class="btn-group-vertical">
//  <button type="button" class="btn btn-primary"><img src={thumbUp_} width="5%" height="5%"></img> </button>
//  <button type="button" class="btn btn-primary"><img src={thumbDown} width="5%" height="5%"></img> </button>
//</div>

// https://css-tricks.com/dont-overthink-flexbox-grids/