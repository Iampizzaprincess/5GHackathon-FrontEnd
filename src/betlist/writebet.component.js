import React from 'react';

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
        <h3 className="lead"> Got a bet idea? Submit it here for upvotes! </h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <p></p>
              <label className="BetInput">Bet Proposal:</label>
              <input type="text" className="form-control" value={this.state.value} placeholder="Enter bet here (Required)" onChange={(event) => this.handleChange(event, 1)}></input>
            </div>
            <p></p>
            <div className = "flex-grid">
              <div className = "col">
                <label>Bet Option 1</label>
                <input type="text" className="form-control" value={this.state.opt1} placeholder="For (default)" onChange={(event) => this.handleChange(event, 2)}></input>
              </div>   
              <div className = "col">
                <label>Bet Option 2</label>
                <input type="text" className="form-control" value={this.state.opt2} placeholder="Against (default)" onChange={(event) => this.handleChange(event, 3)}></input>
              </div>            
            </div>
            <div>
              <p></p>
              <label> Minimum Bet Amount (Credits) </label>
              <input type="text" className="form-control" value={this.state.min} placeholder="1 (default)" onChange={(event) => this.handleChange(event, 4)}></input>
              <p></p>
            </div>
            <button type="submit" className="btn btn-primary">Submit Bet!</button>          
          </form>
        </div>
      );
  }
} // end writeBet

export default WriteBet;