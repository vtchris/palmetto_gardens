import React, { Component } from "react";
import styled from "styled-components";

const Notification = styled.div`
    background-color: #444;
    color: white;
    padding: 16px;
    position: absolute;
    top: -100px;
    right: 1em;
    z-index: 999;
    transition: top 0.5s ease;
`;

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            top: -100
        }
    }
    showNotification = () => {
        this.setState({ top: 125 }, ()=> {
            setTimeout(() => this.setState({top: -100}), 4000)
        });
        
    }
    render() {
        return (
            <>
                <button onClick={this.showNotification}>Test</button>
                <Notification style={{top: this.state.top}}>{this.props.children}</Notification>
            </>

        );
    }
}



export default Notifications;