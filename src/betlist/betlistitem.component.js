import React from 'react';
import thumbUp from '../img/thumbUp.png';
import LoginService from '../login/login.service';
import BetsService from './bets.service';

class BetListItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      liked: false,
      isVote: true,
      isMod: false
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
    //check is mod?
    if (!LoginService.loginName.localeCompare("mod")) {
        console.log("Mod Logged In")
        this.isMod = true;
    }
    return (
        <div className="betItem">
          <div className="flex-grid">
            <div className="col">
              <div className="lead">{this.props.bet.description}</div>
              <p>Moiz Rasheed</p>
            </div>
              <div className={this.props.isNotVote ? 'hide' : 'col'} >
                <button type = "button" className="btn btn-success" 
                  onClick={() => this.toggleLike()}> 
                    <div className={!this.isMod ? 'App':'hide'}>
                      <img src={thumbUp} width ="20%"  ></img> 
                    </div>
                    <div className={this.isMod ? 'App':'hide'}>
                      Approve for betting.
                    </div>
                  </button>
              </div>
            <div className ="col">
              <div>
                <button type="button" className="btn btn-primary">
                  {this.props.bet.option1} 
                  <div className= {(this.isMod)? 'App':'hide'}>
                    -Declare winner?
                  </div>
                </button>
              </div>
              <div>
                <button type="button" className="btn btn-primary">
                  {this.props.bet.option2}
                  <div className= {(this.isMod)? 'App':'hide'}>
                    -Declare winner?
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default BetListItem;