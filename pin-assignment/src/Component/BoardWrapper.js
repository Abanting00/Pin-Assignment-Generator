import React, { Component } from 'react';
import { Button, CustomInput } from 'reactstrap';
import Board from './Board';
import Board2 from './Board2';
import { pinToText, textToPin } from './Helper';

class BoardWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pins: {},
            pinsFromFile: null
        }

        this.updatePins = this.updatePins.bind(this);
        this.removePins = this.removePins.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isDe2 !== prevProps.isDe2) {
            this.setState({
                pinsFromFile: this.state.pins
            })
        }
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

    onFileUpload(e) {
        let file = e.target.files[0];

        if(file.name.split('.')[1] != 'txt'){
            alert("Invalid File please upload text file.")
        }else{
            let fileReader = new FileReader();
            fileReader.onloadend = (e) => {
                let pins = textToPin(e.target.result);
                
                this.setState({
                    pinsFromFile: pins
                })
              };

            fileReader.readAsText(file);
        }
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

		fetch('/api/download', reqOptions)
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
                 {/* <Alert color="danger" className={`show ${}`}> */}
                    {/* This is a danger alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert> */}
                <Button  onClick={this.onDownload} size="sm">Download Pin Assignment <img height="25" width="25" src={require("../Icons/download.png")} /></Button>
                <CustomInput type="file" name="file" id="file" onChange={this.onFileUpload} />

                {<Board name={`${this.props.isDe2 ? "De2" : "De1-SoC"}`} isDe2={this.props.isDe2} pinsFromFile={this.state.pinsFromFile} removePins={this.removePins} updatePins={this.updatePins}/>}
            </div>
        )
    }
}

export default BoardWrapper;