import React, {Component} from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody, Input, Label, Form } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import trash from '../Icons/trash.svg';
import add from '../Icons/add.svg';
import de2 from '../Data/de2.json';
import de1 from '../Data/de1.json';


const Hex = (props) => {
    return [...Array(7)].map((e,i) => (
        <div className="pin-form">
                    <Label>HEX{i}</Label>
                    <Input 
                        type="text" 
                        name= {i} 
                        value={props.hexVal[i]} 
                        onChange={props.onChangeHex}/>
                </div>
    ));
}

class Icon extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hasPinAssignment: false,
            pinValue: "",
            pinName: `${this.props.name}${this.props.num}`,
            hexVal: ["","","","","","",""],
            isHex: this.props.name == "HEX"
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onChangeHex = this.onChangeHex.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.pinsFromFile !== prevProps.pinsFromFile) {
            if(this.state.isHex){
                let hexValues = this.state.hexVal;

                this.state.hexVal.forEach((e,i) => {
                    let pinBoardVal = de2[`${this.state.pinName}${i}`]

                    if(pinBoardVal in this.props.pinsFromFile){
                        hexValues[i] = this.props.pinsFromFile[pinBoardVal];
                    }
                })

                let hexBool = hexValues.map(el => !(el == ""))
                const validation = (x,c) => x || c;

                this.setState({
                    hasPinAssignment: hexBool.reduce(validation),
                    hexVal: hexValues
                }, () => {
                    hexBool.forEach((el,i) => {
                        if(el){
                            this.props.updatePins(`${this.state.pinName}${i}`, this.state.hexVal[i])
                        }else{
                            this.props.removePins(`${this.state.pinName}${i}`, this.state.hexVal[i])
                        }
                    });
                });
            }else{
                 // Check if current icon exist on imported file
                let pinBoardVal = de2[this.state.pinName];
                if(pinBoardVal in this.props.pinsFromFile){
                    this.setState({
                        hasPinAssignment: true,
                        pinValue: this.props.pinsFromFile[pinBoardVal]
                    }, () => { this.props.updatePins(this.state.pinName, this.state.pinValue)
                    });
                }
            }
        }
      }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    onSubmit(e) {
        e.preventDefault();
        let hexValues = this.state.hexVal.map(el => !(el == ""))
        const validation = (x,c) => x || c;

        if(this.state.isHex){
            this.setState({
                hasPinAssignment: hexValues.reduce(validation)
            }, () => {
                hexValues.forEach((el,i) => {
                    if(el){
                        this.props.updatePins(`${this.state.pinName}${i}`, this.state.hexVal[i])
                    }else{
                        this.props.removePins(`${this.state.pinName}${i}`, this.state.hexVal[i])
                    }
                });
            });
        }else{
            this.setState({
                hasPinAssignment: this.state.pinValue !== ""
            }, () => {
                    if(this.state.hasPinAssignment){
                        this.props.updatePins(this.state.pinName, this.state.pinValue);
                    }else{
                        this.props.removePins(this.state.pinValue);
                    }
            });
        }
    }

    onRemove() {
        if(this.state.isHex){
            this.setState({
                hexVal: ["","","","","","",""],
                hasPinAssignment: false
            }, () => {
                this.state.hexVal.forEach((el,i) => {
                    this.props.removePins(`${this.state.pinName}${i}`, this.state.hexVal[i])
                })
            })
        }else{
            this.setState({
                pinValue: "",
                hasPinAssignment: false
            }, () => {this.props.removePins(this.state.pinName);})
        }
    }

    onChangeHex(e) {
        let hexValues = [...this.state.hexVal];
        hexValues[e.target.name] = e.target.value;

        this.setState(prevState => ({
            hexVal: hexValues
        }));
    }



    render() {
        return (

            <div 
                tabIndex="2" 
                className={`icon ${this.state.hasPinAssignment ? "active" : ""}`} 
                id={this.state.pinName}
            >    
                <img 
                    src={this.props.icon} 
                    className={this.props.tag}
                />

                <UncontrolledPopover 
                    trigger="legacy" 
                    placement="bottom" 
                    target={this.state.pinName}
                >
                    <PopoverHeader>
                        {this.props.name}[{this.props.num}]
                    </PopoverHeader>

                    <PopoverBody>
                        <Form onSubmit={this.onSubmit}>
                            {this.state.isHex ? <Hex hexVal={this.state.hexVal} onChangeHex={this.onChangeHex}/> : <div className="pin-form">
                                <Label>Pin Name</Label>
                                
                                <Input 
                                    type="text" 
                                    name="pinValue" 
                                    value={this.state.pinValue} 
                                    onChange={this.onChange}/>
                            </div>}
                            
                            <Container fluid={true}>
                                <Row className="justify-content-between">
                                    <Col>
                                        <a 
                                            className="icon-button" 
                                            type="submit" 
                                            onClick={this.onSubmit}
                                        >
                                            <img 
                                                src={add} 
                                                height="40" 
                                                width="40"/>
                                        </a>
                                    </Col>
                                    <Col sm={{ size: 'auto', offset: 1 }}>
                                        <a 
                                            className="icon-button" 
                                            type="submit" 
                                            onClick={this.onRemove}>

                                            <img 
                                                src={trash} 
                                                height="40" 
                                                width="40"/>
                                        </a>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </PopoverBody>
                </UncontrolledPopover>
            </div>

        );
    }
};

export default Icon;