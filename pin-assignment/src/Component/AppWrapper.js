import React, { Component } from 'react';
import BoardWrapper from './BoardWrapper';
import NavH from './NavH';

class AppWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDe2: true
        }

        this.onSwitch = this.onSwitch.bind(this);
    }

    onSwitch(){
        this.setState({
            isDe2: !this.state.isDe2
        })
    }

    render() {
        return(
            <div>
                <NavH isDe2={this.state.isDe2} onSwitch={this.onSwitch} />
                <div className={`${this.state.isDe2 ? "center" : "center2"}`}>
                    <BoardWrapper isDe2={this.state.isDe2} onSwitch={this.onSwitch}/>
                </div>
            </div>
        )
    }
}

export default AppWrapper;