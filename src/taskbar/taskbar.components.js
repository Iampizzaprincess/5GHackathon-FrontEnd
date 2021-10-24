import Button from "@restart/ui/esm/Button";
import React from "react";
import LoginService from "../login/login.service"; 
import BetsService from "../betlist/bets.service";
import Login from "../login/login.component";
import EventsService from "../server-events.service";

class TaskBarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      credits: 0
    }

    LoginService.getUserInfo()
     .then(data => this.setState({credits:data.credits}));
    EventsService.addListener("credits", this.createListener());
  }

  createListener() {
    return (data) => {
      this.setState({credits: data.credits})
    };
  }

  render(){
    return( 
      <div className="TaskBarSty">
        <div className="flex-grid">
          <div className="col">
            Hello, {LoginService.loginName}! 
          </div>
          <div className="col">
            Credits: {this.state.credits}
          </div>
          <div className="col"><button className="btn btn-danger" onClick={()=>BetsService.refreshViews()}>Refresh Page</button></div>
        </div>              
      </div>
    );
  }
}

export default TaskBarItem