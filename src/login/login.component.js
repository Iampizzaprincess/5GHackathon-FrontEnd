import React from 'react';
import { Redirect } from 'react-router';
import LoginService from './login.service';

class Login extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        name: '', 
        loggedIn: LoginService.loggedIn
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  setLoggedInState(loggedIn) {
    let newState = {};
    if (loggedIn) {
      newState = Object.assign(newState, this.state);
      newState.loggedIn = loggedIn;
      this.setState(newState);
    }
  }

  handleChange(event) {
    this.setState({
      name: event.target.value,
      loggedIn: this.state.loggedIn
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    LoginService.login(this.state.name)
      .then(loggedIn => {
        this.setLoggedInState(loggedIn);
      });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? <Redirect to="/f" /> : <br/>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.name} placeholder="Name" onChange={this.handleChange}></input>
          </div>
          <button type="submit" className="btn btn-primary">Enter</button>          
        </form>
      </div>
    );
  }
}

export default Login;