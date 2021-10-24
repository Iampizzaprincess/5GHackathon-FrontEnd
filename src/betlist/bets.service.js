import { backendURL } from "../constants";
import { PostFormData, PostJson } from "../HttpService";

class BetsService {
  // Ethan IP 172.18.192.61
  static url = backendURL;
  static betsEventSource;

  static getBet(id) {
    return fetch(this.url + '/bets/' + id)
      .then(response => response.json())
      .catch(err => {
        console.log('/bets failed fetch - using fallback\n', err);
        return JSON.parse(dummyDataFallback);
      });
  }

  static getAllBets() {
    /*this.betsEventSource = new EventSource("//" + this.url + "/stream", {withCredentials: true});
    this.betsEventSource.onmessage = function (event) {
      console.log(event);
    };*/

    return fetch(this.url + '/bets')
      .then(response => response.json())
      .catch(err => {
        console.log('/bets failed fetch - using fallback\n', err);
        return JSON.parse(dummyDataFallback);
      })
      .then(data => {
        console.log(data);
        return this.sortBets(Object.values(data));
      });
  }

  static createBet(state) {
    let formData = new FormData();
    formData.append("description", state.value);
    formData.append("option1", state.opt1);
    formData.append("option2", state.opt2);
    formData.append("min_wager", state.min);
    return PostFormData('/bets/', formData)
      .then(data => data.success)
  }

  static likeBet(id) {
    return PostJson("/bets/"+id+"/like", {})
      .then(data => {
        console.log('like-betsserv', data);
        return data.success;
      });
  }

  static unlikeBet(id) {
    return PostJson("/bets/"+id+"/unlike", {})
      .then(data => {
        console.log('unlike-betsserv', data)
        return data.success
      });
  }

  static approveBet(id) {
    let formData = new FormData();
    return PostFormData("/bets/"+id+"/approve", formData)
      .then(response => console.log(response));
  }

  static selectOption(id, option, wager) {
    let formData = new FormData();
    formData.append("option", String(option));
    formData.append("wager", String(wager));
    return PostFormData("/bets/"+id+"/select-option", formData)
      .then(response => console.log(response));
  }

  static selectCorrectOption(id, option) {
    let formData = new FormData();
    formData.append("option", String(option));
    return PostFormData("/bets/"+id+"/end", formData)
      .then(response => console.log(response));
  }

  static sortBets(bets) {
    return bets.sort((el1, el2) => {
      if (el1.approved && el2.approved)
        return el1.nLikes > el2.nLikes ? -1 : 1;
      else {
        if (el1.approved)
          return -1;
        else if (el2.approved)
          return 1;
        else
          return el1.nLikes > el2.nLikes ? -1 : 1;
      }
    });
  }
}

let dummyDataFallback = '{"1":{"description":"Description 0","id":1, "option1":"for", "option2":"against"},"2":{"description":"Description 1","id":2},"3":{"description":"Description 2","id":3},"4":{"description":"Description 3","id":4},"5":{"description":"Description 4","id":5},"6":{"description":"Description 5","id":6},"7":{"description":"Description 6","id":7},"8":{"description":"Description 7","id":8},"9":{"description":"Description 8","id":9},"10":{"description":"Description 9","id":10}}';

export default BetsService;