import LoginService from "../login/login.service";
import { backendURL } from "../constants";
import { PostFormData, PostJson } from "../HttpService";
import EventsService from "../server-events.service";
import Get from "es-abstract/2015/Get";

class BetsService {
  // Ethan IP 172.18.192.61
  static url = backendURL;
  static betsView = [];
  static bets = [];
  static betsDict = {};
  static numChanges = 0;

  static registerView(view) {
    this.betsView.push(view);
    if (this.betsView.length == 1){
      EventsService.addListener("bets", (data) => {
        this.betsListener(data);
      });
    }
  }

  static betsListener(data) {
    this.processBetsData(data)
      .then((bets) => {
        this.numChanges += 1;
        if (this.numChanges % 5 == 0) {
          this.refreshViews();
        }
      });
  }

  static refreshViews() {
    for (let view of this.betsView) 
      view.updateBetsList(this.bets);
  }


  static processBetsData(betsData) {
    console.log(betsData);
    return this.addUserInfoToBets(betsData)
      .then(bets => {
        console.log(bets);
        this.sortBets(bets);
        this.bets = bets;
        console.log(this.bets);
        return this.bets;
      })
  }

  static addUserInfoToBets(betsData) {
    let id = LoginService.loginId;
    return fetch('/users/'+id+'/bets')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        for (const [key, value] of Object.entries(data)) {
          betsData[key].like = value.like;
          betsData[key].option = value.option;
          betsData[key].wager = value.wager;
        }
        console.log(betsData);
        let retbets = [];
        for (let key of Object.keys(betsData)) {
          retbets.push(JSON.parse(JSON.stringify(betsData[key])));
        }
        console.log(retbets);
        return retbets;
      });
  }

  static getBet(id) {
    return fetch(this.url + '/bets/' + id)
      .then(response => response.json());
  }

  static getAllBets() {
    return fetch(this.url + '/bets')
      .then(response => response.json())
      .catch(err => {
        console.log('/bets failed fetch - using fallback\n', err);
        return JSON.parse(dummyDataFallback);
      })
      .then(data => {
        return this.processBetsData(data);
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
        // console.log('like-betsserv', data);
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

  static pushBet(id) {
    let formData = new FormData();
    return PostFormData("/bets/"+id+"/push", formData)
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
dummyDataFallback = '{"1": {"approved": true, "description": "Will I Die by the end of this weekend", "id": 1, "min_wager": 4.0, "nLikes": 2, "nOption1": 0, "nOption2": 0, "nUnchosen": 2, "option1": "yes", "option2": "yes", "pot": 0.0, "winner": -1}, "2": {"approved": false, "description": "Jackie will throw up", "id": 2, "min_wager": 1.0, "nLikes": 0, "nOption1": 1, "nOption2": 0, "nUnchosen": 0, "option1": "yes", "option2": "everywhere", "pot": 1.0, "winner": 2}}';

export default BetsService;