import Button from "@restart/ui/esm/Button";
import React from "react";
import LoginService from "../login/login.service"; 
import BetsService from "../betlist/bets.service";

class TaskBarItem extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            value: []
        }
    }

    render(){
        return(
                <div className="TaskBarSty">
                    <div className="flex-grid">
                        <div className="col">
                            Hello, {LoginService.loginName}! 
                        </div>
                        <div className="col">
                            Credits: 69 
                        </div>
                        <div className="col"><button className="btn btn-danger" onClick={()=>BetsService.refreshViews()}>Refresh Page</button></div>
                    </div>              
                </div>
        );
    }
}

export default TaskBarItem