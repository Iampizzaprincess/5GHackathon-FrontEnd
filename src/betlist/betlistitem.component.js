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
      isMod: false,
      isActive: false,
      isExpired: false
    }
    this.id = this.props.bet.id;
  }

  toggleLike() {
    console.log(this.state.liked);
    let resp = undefined;
    if (!this.state.liked)
      resp = this.like();
    else 
      resp = this.unlike();
    resp.then(() => {
      BetsService.getBet(this.id)
        .then(data => console.log(data));
    });
  }

  like() {
    return BetsService.likeBet(this.id)
      .then(success => this.setState({liked: success}));
  }

  unlike() {
    return BetsService.unlikeBet(this.id)
      .then(success => this.setState({liked: !success}));
  }

  clickOption(option) {
    if (this.isMod)
      BetsService.selectCorrectOption(this.id, option);
    else
      BetsService.selectOption(this.id, option, this.props.bet.min_wager);
  }


  render() {
    //check is mod?
    if (!LoginService.loginName.localeCompare("mod")) {
        console.log("Mod Logged In")
        this.isMod = true;
    }
    // check is active?
    if (this.props.bet.approved){
      if(this.props.bet.winner!=-1){ // no one has won and is active
        this.isActive = true;
        this.isExpired = false;
      }else{
        this.isActive = false;
        this.isExpired = true; // this is an old bet
      }
    }
    return (
        <div className="betItem">
          <div className="flex-grid">
            <div className="col">
              <div className="lead">{this.props.bet.description}</div>
              <p>Wager: {this.props.bet.min_wager} Credits</p>
            </div>
              <div className="col">
                {this.props.isNotVote ?
                  <br/>
                :
                 this.isMod ?
                <button type = "button" className="btn btn-success" 
                  onClick={() => BetsService.approveBet(this.id)}> 
                    <div>
                      Approve for betting.
                    </div>
                  </button>
                 :
                <button type = "button" className="btn btn-success" 
                  onClick={() => this.toggleLike()}> 
                    <div className="flex-grid">
                      <div className="col">
                        <img src={thumbUp} width ="20%"  ></img> 
                      </div>
                      <div className="col">
                        <div  className="lead">
                          {this.props.bet.nLikes} 
                        </div>
                      </div>
                    </div>
                  </button>
                }
              </div>
            <div className ="col">
              <OptionButtons option={this.props.bet.option1}
                             isMod={this.isMod}
                             onClick={() => this.clickOption(1)} />
              <OptionButtons option={this.props.bet.option2}
                             isMod={this.isMod}
                             onClick={() => this.clickOption(2)} />
            </div>
            <div className="col">
              <p>Total Pot:</p>
              {this.props.bet.pot}
              Credits
            </div>
          </div>
        </div>
    );
  }
}

function OptionButtons(props) {
  return (
    <div onClick={() => props.onClick()}>
      <button type="button" className="btn btn-secondary">
        {props.option} 
        {props.isMod ? <div>-Declare winner?</div> : undefined}
      </button>
    </div>
  );
}

export default BetListItem;