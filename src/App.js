import './App.css';
import BetsService from './BetsService';
import ModService from './ModService';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  useRouteMatch
} from "react-router-dom";
import Login from './login/login.component'
import thumbUp_ from './thumbUp_.png';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleElevateStatus() {
    ModService.toggleModStatus();
    console.log(ModService.isMod);
  }

  render() {
    return (
      <div>
        <Switch> 
          <Route path='/f'>
            <MainPage />
          </Route>
          <Route path='/'>
            {<Login />}
          </Route>
        </Switch>
      </div>
    );
  }
}

function MainPage(props) {
  let { path , url } = useRouteMatch();
  return (
    <div>
      <nav>
        <div><Link to='/f/create'>+</Link></div>
      </nav>
      <Switch>
        <Route path={`${path}/create`}>
          <WriteBet />
        </Route>
        <Route path={`${path}/`}>
          <BetList />
        </Route>
      </Switch>
    </div>
  );
}

class WriteBet extends React.Component {
  constructor(props){
    super(props);
      this.state = {value: '', 
                    opt1:  '',
                    opt2:  '',
                    min:   ''
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(event, num) {
    //this.setState({value: event.target.value});
    switch (num){
      case 1: this.setState({value: event.target.value});
            break;
      case 2: this.setState({opt1: event.target.value});
            break;
      case 3: this.setState({opt2: event.target.value});
            break;
      case 4: this.setState({min: event.target.value});
            break;
    }
  }

  handleSubmit(event) {
    // parse in default parameters
    //TO DO
    alert('A bet was submitted! ' + this.state.value + ", " + this.state.opt1 + ", " + this.state.opt2 + ", " + this.state.min);
    event.preventDefault();
  }

  render() {
    return(
        <div className="App"> 
        <h class="lead"> Got a bet idea? Submit it here for upvotes! </h>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
            <p></p>
              <label for="BetInput">Bet Proposal:</label>
              <input type="text" class="form-control" value={this.state.value} placeholder="Enter bet here (Required)" onChange={(event) => this.handleChange(event, 1)}></input>
            </div>
            <p></p>
            <div className = "flex-grid">
              <div className = "col">
                <label>Bet Option 1</label>
                <input type="text" class="form-control" value={this.state.opt1} placeholder="For (default)" onChange={(event) => this.handleChange(event, 2)}></input>
              </div>   
              <div className = "col">
                <label>Bet Option 2</label>
                <input type="text" class="form-control" value={this.state.opt2} placeholder="Against (default)" onChange={(event) => this.handleChange(event, 3)}></input>
              </div>            
            </div>
            <div>
              <p></p>
              <label> Minimum Bet Amount (Credits) </label>
              <input type="text" class="form-control" value={this.state.min} placeholder="1 (default)" onChange={(event) => this.handleChange(event, 4)}></input>
              <p></p>
            </div>
            <button type="submit" class="btn btn-primary">Submit Bet!</button>          
          </form>
        </div>
      );
  }
} // end writeBet


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
        <div className="flex-grid">
          <div className="col">
            <div className="lead">{props.bet.description}</div>
            <p>Moiz Rasheed</p>
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
                {props.bet.option1}
              </button>
            </div>
            <div>
              <button type="button" className="btn btn-primary">
                {props.bet.option2}
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