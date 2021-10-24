import React from 'react';
import BetListItem from './betlistitem.component';
import BetsService from './bets.service';

class BetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: []
    };

    BetsService.registerView(this);  
  }

  componentDidMount() {
    BetsService.getAllBets()
      .then(data => {
        console.log(data)
        this.updateBetsList(data)
      });
  }

  updateBetsList(bets) {
    console.log('entered updateBetsList')
    this.setState({
      bets: bets
    });
  }

  render() {
    let betListItems = [];
    for (let [id, bet] of Object.entries(this.state.bets)) {
      betListItems.push(
        <BetListItem bet={bet}
                     key={id}/>
      );
    }
    return (
     <div>
        {betListItems}
      </div>
    );
  }
}

export default BetList;