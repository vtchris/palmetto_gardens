import React, { Component } from "react";
import styled from "styled-components";
import events from "events";

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

const emitter = new events.EventEmitter();

export const notify = (msg, icon) => {

    emitter.emit('alert', msg, icon);
}
class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: '',
            msg: '',
            top: -100
        }
        emitter.on('alert', (msg, icon) => {
            const newState = this.state;
            
            newState.msg = msg;
            newState.icon = icon;
            
            this.setState(newState);
            this.showNotification()
        });
    }
    showNotification = () => {
        this.setState({ top: 125 }, () => {
            setTimeout(() => this.setState({ top: -100 }), 4000)
        });        
    }
    render() {
        return (
            <Notification style={{ top: this.state.top }}><ul className="list-unstyled text-left mb-0">{this.state.msg.split("\n").map(m => <li><span className={`${this.state.icon} mr-2`}></span>{m}</li>)}</ul></Notification>
        );
    }
}

export default Notifications;