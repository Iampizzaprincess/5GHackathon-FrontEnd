class BetsService {
  static url = ""
  static betsEventSource;

  static getAllBets() {
    this.betsEventSource = new EventSource("/bets");
    return fetch(this.url + '/bets')
      .then(response => response.json())
      .catch(err => console.log('/bets failed fetch', err));
  }
}

export default BetsService;