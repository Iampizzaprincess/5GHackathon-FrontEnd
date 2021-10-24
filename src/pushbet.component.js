import React from 'react';
import BetListItem from './betlist/betlistitem.component';
import {Accordion, Card, Button} from 'react-bootstrap';

class PushBet extends React.Component {
    // pops open the list of active 
    constructor(props) {
      super(props);
      this.state = {
        bets: [] // active, approved bets 
      };
    }
    
    render(){
        let pushBetItems = [];
        pushBetItems.push( // here you will do a for loop to push on items to pushBetItems and render them like betlist.component.js line 29
            <BetListItem bet={JSON.parse('{"approved":false,"description":"Description 0","id":1,"option1":"Yes","option2":"No"}')
                            } isNotVote={true}/>
        ); 
        return(
        <div>
          <div className="PushItem">  
            Live Bets
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header> Click to collapse live bets. </Accordion.Header> 
                <Accordion.Body> 
                    {pushBetItems}
                </Accordion.Body>        
              </Accordion.Item>
            </Accordion>
          </div> 
        </div>
      );
    }
  
  } // end PushBet gui 

  export default PushBet;