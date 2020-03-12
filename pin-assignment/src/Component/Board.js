import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Icon from './Icon';
import button from '../Icons/button.svg';
import switchl from '../Icons/switchl.svg';
import ledr from '../Icons/ledr.svg';
import ledg from '../Icons/ledg.svg';
import ssd from '../Icons/ssd.svg';

const GetIconCol = (props) => {
    return [...Array(props.num_col)].map((e,i) => (
        <Col xs={props.xs} key={i}>
            <Row>
                {[...Array(props.num_icon)].map((e,i) => (
                <Icon 
                    updatePins = {props.updatePins}
                    removePins = {props.removePins}
                    icon={props.icon_name} 
                    name={props.name} 
                    tag={props.tag} 
                    key={i} 
                    num={`${props.name === "HEX" ? props.num_icon + props.start - i - 1: props.num_icon - i - 1}`}>
                    </Icon>))}
            </Row>
        </Col>
    ));    
}

class Board extends Component {

    render() {
        return (
            <div className="board-bg">    
                <Container fluid={true}>
                    <Row className="justify-content-md-center">
                         <h1 className="board-name">Altera {this.props.name} Board</h1>
                    </Row>

                    <Row>
                        <div className="ssd-margin">
                           <GetIconCol 
                                xs="auto" 
                                updatePins={this.props.updatePins} 
                                removePins={this.props.removePins}
                                num_col = {1} 
                                num_icon = {2} 
                                icon_name={ssd} 
                                name="HEX" 
                                tag="ssd" 
                                start={6}/>
                        </div>

                        <div className="button-led">
                           <GetIconCol 
                                xs="auto" 
                                updatePins={this.props.updatePins}
                                removePins={this.props.removePins} 
                                num_col = {1} 
                                num_icon = {2} 
                                icon_name={ssd} 
                                name="HEX" 
                                tag="ssd" 
                                start={4}/>
                        </div>
                        <div className="button-led">
                            <GetIconCol 
                                xs="auto" 
                                updatePins={this.props.updatePins}
                                removePins={this.props.removePins} 
                                num_col = {1} 
                                num_icon = {4} 
                                icon_name={ssd} 
                                name="HEX" 
                                tag="ssd" 
                                start={0}/>
                        </div>
                    </Row>

                    <Row className="justify-content-md-center">
                        <GetIconCol 
                            xs="auto" 
                            updatePins={this.props.updatePins}
                            removePins={this.props.removePins} 
                            num_col = {1} 
                            num_icon = {18} 
                            icon_name={ledr} 
                            name="LEDR" 
                            tag={"led"}/>

                        <div className="button-led">
                            <GetIconCol 
                                xs="auto" 
                                updatePins={this.props.updatePins}
                                removePins={this.props.removePins} 
                                num_col = {1} 
                                num_icon = {4} 
                                icon_name={ledg} 
                                name ="LEDG" 
                                tag={"led"}/>
                        </div>
                    </Row>
                    
                    <Row className="justify-content-md-center">
                        <GetIconCol 
                            xs="auto" 
                            updatePins={this.props.updatePins}
                            removePins={this.props.removePins} 
                            num_col = {1} 
                            num_icon = {18} 
                            icon_name={switchl} 
                            name="SW" 
                            tag={"button-switch"}/>

                        <div className="button-led">
                           <GetIconCol 
                                xs="auto" 
                                updatePins={this.props.updatePins}
                                removePins={this.props.removePins} 
                                num_col = {1} 
                                num_icon = {4} 
                                icon_name={button} 
                                name="KEY" 
                                tag={"button-switch"}/>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Board;