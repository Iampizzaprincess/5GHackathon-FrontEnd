import { PostJson } from '../HttpService';
import { backendURL } from '../constants';
import EventsService from '../server-events.service';

class LoginService {
  static url = backendURL;
  static loggedIn = false;
  static loginName = "";
  static loginId;
  
  static login(name) {
    return PostJson('/users/login', {name: name})
      .then(data => {
        console.log(data);
        this.loggedIn = data.success;
        if (data.success) {
          this.loginName = name;
          this.loginId = data.id;
          EventsService.connect(this.loginId);
        }
        return this.loggedIn;
      });
  }
}

export default LoginService;