import {Accordion, Card, Button} from 'react-bootstrap';


class PushBet extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bets: [] // active, approved bets 
      };
    }
    
    render(){
      return(
        <div>
          <div className="PushItem">  
            Live Bets
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header> Click here for live bets. </Accordion.Header> 
                <Accordion.Body> A cool live bet. </Accordion.Body>        
              </Accordion.Item>
            </Accordion>
          </div> 
        </div>
      );
    }
  
  } // end PushBet gui 

  export default PushBet;