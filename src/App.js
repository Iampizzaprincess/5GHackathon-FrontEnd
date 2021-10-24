import './App.css';
import ModService from './ModService';
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Login from './login/login.component'
import MainPage from './mainpage.component';

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




export default App;

//<div className="App">
//</div><div class="lead"> "I bet this thing happens" </div>
//<div class="btn-group-vertical">
//  <button type="button" class="btn btn-primary"><img src={thumbUp_} width="5%" height="5%"></img> </button>
//  <button type="button" class="btn btn-primary"><img src={thumbDown} width="5%" height="5%"></img> </button>
//</div>

// https://css-tricks.com/dont-overthink-flexbox-grids/