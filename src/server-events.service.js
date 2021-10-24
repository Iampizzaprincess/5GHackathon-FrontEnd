import { backendURL } from "./constants";

class EventsService {
  static eventSource;
  static listeners = {};
  static betsListeners = [];
  static creditListeners = [];
  static pushListeners = [];
  
  static connect(id) {
    let url = "/stream?channel="+id;
    this.eventSource = new EventSource('//172.18.192.83:5000'+url);
    console.log('sse connection attempted', id);

    let handler = this.createHandler();
    this.eventSource.onmessage = function (event) {
      handler(event);
    };
  }

  static createHandler() {
    return (event) => {
      let raw = JSON.parse(event.data);
      let type = raw.type;
      let data = raw.data;
      console.log(type, data);
      console.log(this, this.listeners);
      for (let listener of this.listeners[type])
        listener(data);
    };
  }

  static addListener(event, callback) {
    if (!(this.listeners[event]))
      this.listeners[event] = [];
    console.log(this.listeners[event]);
    this.listeners[event].push(callback);
  }

  static handleMessage(event) {
    console.log(event);
  }
    /*this.betsEventSource = new EventSource("//" + this.url + "/stream", {withCredentials: true});
    this.betsEventSource.onmessage = function (event) {
      console.log(event);
    };*/
}

export default EventsService;