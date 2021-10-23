import { backendURL } from "./constants";

class BetsService {
  // Ethan IP 172.18.192.61
  static url = backendURL;
  static betsEventSource;

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
      });
  }
}

let dummyDataFallback = '{"1":{"description":"Description 0","id":1, "action1":"for", "action2":"against"},"2":{"description":"Description 1","id":2},"3":{"description":"Description 2","id":3},"4":{"description":"Description 3","id":4},"5":{"description":"Description 4","id":5},"6":{"description":"Description 5","id":6},"7":{"description":"Description 6","id":7},"8":{"description":"Description 7","id":8},"9":{"description":"Description 8","id":9},"10":{"description":"Description 9","id":10}}';

export default BetsService;