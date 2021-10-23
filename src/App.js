import './App.css';
import BetsService from './BetsService';
import React from 'react';
import thumbUp_ from './thumbUp_.png';


function App() {
  
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
  // format bet list item here 
  return (
      <div class="betItem">
        <div class="lead">{props.bet.description}</div>
        <div className="flex-grid">
          <div className="col">
              Moiz Rasheed
          </div>
          <div className="col">
            <button type = "button" class="btn btn-success" 
              onClick={() => console.log('Liked')}> 
                <img src={thumbUp_} width ="20%" ></img> 
              </button>
          </div>
          <div className="col">
            <div>
              <button type="button" class="btn btn-primary">
                {props.bet.action1}
              </button>
            </div>
            <div>
              <button type="button" class="btn btn-primary">
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