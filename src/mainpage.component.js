import {
  Switch,
  Route,
  Link, 
  useRouteMatch
} from "react-router-dom";
import BetList from "./betlist/betlist.component";
import WriteBet from "./betlist/writebet.component";
import PushBet from "./betlist/pushbet.component";
import TaskBarItem from "./taskbar/taskbar.components";

function MainPage(props) {
  let { path , url } = useRouteMatch();
  return (
    <div>
      <nav>
       <TaskBarItem />
        <div><Link to='/f/create'><button className="btn btn-success">New Bet</button></Link></div>
      </nav>
      <Switch>
        <Route path={`${path}/create`}>
          <WriteBet />
        </Route>
        <Route path={`${path}/`}>
          <BetList />
        </Route>
      </Switch>
      <PushBet />
    </div>
  );
}

export default MainPage;