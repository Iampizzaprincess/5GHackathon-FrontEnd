import React from 'react';
import thumbUp from '../img/thumbUp.png';
import BetsService from './bets.service';

class BetListItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  toggleLike() {
    console.log(this.state.liked);
    if (!this.state.liked)
      this.like();
    else 
      this.unlike();
    BetsService.getBet(this.props.bet.id)
      .then(data => console.log(data));
  }

  like() {
    BetsService.likeBet(this.props.bet.id)
      .then(success => this.setState({liked: success}));
  }

  unlike() {
    BetsService.unlikeBet(this.props.bet.id)
      .then(success => this.setState({liked: !success}));
  }
  // format bet list item here 
  render() {
    return (
        <div className="betItem">
          <div className="flex-grid">
            <div className="col">
              <div className="lead">{this.props.bet.description}</div>
              <p>Moiz Rasheed</p>
            </div>
            <div className="col">
              <button type = "button" className="btn btn-success" 
                onClick={() => this.toggleLike()}> 
                  <img src={thumbUp} width ="20%" ></img> 
                </button>
            </div>
            <div className="col">
              <div>
                <button type="button" className="btn btn-primary">
                  {this.props.bet.option1}
                </button>
              </div>
              <div>
                <button type="button" className="btn btn-primary">
                  {this.props.bet.option2}
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default BetListItem;