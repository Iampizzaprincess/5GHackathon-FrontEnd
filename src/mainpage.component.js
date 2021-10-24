import {
  Switch,
  Route,
  Link, 
  useRouteMatch
} from "react-router-dom";
import BetList from "./betlist/betlist.component";
import WriteBet from "./betlist/writebet.component";

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

export default MainPage;