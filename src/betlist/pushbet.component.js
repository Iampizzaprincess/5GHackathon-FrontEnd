import React from 'react';
import BetListItem from './betlistitem.component';
import {Accordion, Card, Button} from 'react-bootstrap';
import EventsService from '../server-events.service';

class PushBet extends React.Component {
    // pops open the list of active 
    constructor(props) {
      super(props);
      this.state = {
        bet: {},
        active: false
      };

      EventsService.addListener("notification", this.createListener());
    }

    componentDidMount() {
      this.collapseAccordion();
    }

    createListener() {
      return (data) => {
        this.setState({bet: data, active: true});
        this.expandAccordion();
      };
    }

    expandAccordion() {
      let accord = document.getElementsByClassName('accordion')[0];
      accord.classList.remove('collapse');
    }

    collapseAccordion() {
      let accord = document.getElementsByClassName('accordion')[0];
      accord.classList.add('collapse');
    }
    
    render(){
        let pushBetItems = [];
        pushBetItems.push( // here you will do a for loop to push on items to pushBetItems and render them like betlist.component.js line 29
            <BetListItem bet={this.state.bet}
                         isNotVote={true}
                         key={this.state.bet.id}/>
        ); 
        return(
        <div>
          <div className="PushItem">  
            <Accordion defaultActiveKey="0">
              Live Bets
              <Accordion.Item eventKey="0">
                <Accordion.Header onClick={() => this.collapseAccordion()}></Accordion.Header> 
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