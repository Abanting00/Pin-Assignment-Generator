import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Board from './Board';
import { pinToText } from './Helper';

class BoardWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pins: {}
        }

        this.updatePins = this.updatePins.bind(this);
        this.removePins = this.removePins.bind(this);
        this.onDownload = this.onDownload.bind(this);
    }

    updatePins(pinName, pinValue){
        this.setState(prevState => {
            let pins = Object.assign({}, prevState.pins);  
            pins[pinName] = pinValue;                                     
            return { pins };                                 
          })

        console.log("updated Pins");
    }

    removePins(pinName){
        this.setState(prevState => {
            let pins = Object.assign({}, prevState.pins);  
            delete pins[pinName];                                    
            return { pins };                                 
          })
        
        console.log("removed pin");
    }

    onDownload(){
        let pinText = pinToText(this.state.pins);

        const data = {"pins": pinText};
        console.log(JSON.stringify(data));
        const reqOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}

		fetch('http://localhost:8000/api/download', reqOptions)
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pin_assignment.txt');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch((error) => {console.log("ERROR!")}); 
    }

    render() {
        return (
            <div>
                <Button  onClick={this.onDownload} size="sm">Download Pin Assignment <img height="25" width="25" src={require("../Icons/download.png")} /></Button>
                {/* <Button color="info" onClick={this.onDownload}>Download Pin Assignment</Button> */}

                <Board name="De2" removePins={this.removePins} updatePins={this.updatePins}/>
            </div>
        )
    }
}

export default BoardWrapper;