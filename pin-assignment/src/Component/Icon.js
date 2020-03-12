import React, {Component} from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody, Input, Label, Form } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import trash from '../Icons/trash.svg';
import add from '../Icons/add.svg';

class Icon extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hasPinAssignment: false,
            pinValue: "",
            pinName: `${this.props.name}${this.props.num}`
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            hasPinAssignment: this.state.pinValue !== ""
        }, () => {
                if(this.state.hasPinAssignment){
                    console.log("trigger update on icon");
                    this.props.updatePins(this.state.pinName, this.state.pinValue);
                }else{
                    console.log("trigger remove on icon");
                    this.props.removePins(this.state.pinValue);
        
                }
        });


        // alert('submitted');

        console.log("submitted");
    }

    onRemove() {
        this.setState({
            pinValue: "",
            hasPinAssignment: false
        }, () => {this.props.removePins(this.state.pinName);})
    }



    render() {
        return (

            <div tabindex="2" className={`icon ${this.state.hasPinAssignment ? "active" : ""}`} id={this.state.pinName}>    
                <img src={this.props.icon} className={this.props.tag}/>
                <UncontrolledPopover trigger="legacy" placement="bottom" target={this.state.pinName}>
                    <PopoverHeader>
                    {this.props.name}[{this.props.num}]
                    </PopoverHeader>
                    <PopoverBody>
                        <Form onSubmit={this.onSubmit}>
                            <div className="pin-form">
                                <Label>Pin Name</Label>
                                <Input type="text" name="pinValue" value={this.state.pinValue} onChange={this.onChange}/>
                            </div>
                            
                            <Container fluid={true}>
                                <Row className="justify-content-between">
                                    <Col>
                                        <a className="icon-button" type="submit" onClick={this.onSubmit}>
                                            <img src={add} height="40" width="40"/>
                                        </a>
                                    </Col>
                                    <Col sm={{ size: 'auto', offset: 1 }}>
                                        <a className="icon-button" type="submit" onClick={this.onRemove}>
                                            <img src={trash} height="40" width="40"/>
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