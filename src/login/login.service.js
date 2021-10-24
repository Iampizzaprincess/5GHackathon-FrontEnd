import { Post } from '../HttpService';
import { backendURL } from '../constants';

class LoginService {
  static url = backendURL;
  static loggedIn = false;

  static login(name) {
    return Post('/users/login', {name: name})
      .then(data => {
        console.log(data);
        this.loggedIn = data.success;
        return this.loggedIn;
      });
  }
}

export default LoginService;