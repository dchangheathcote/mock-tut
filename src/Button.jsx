import React, { Component } from 'react';

class Button extends Component {
    constructor(props){
        super(props)
        this.onHandleClick = this.onHandleClick.bind(this);
    }
    onHandleClick(){
        this.props.onHandleClick(this.props.clickCount);
    }
    render() { 
        const {clickCount} = this.props;
        const text = clickCount===0 ? "don't click me" : 'ok, click me';
        return (
            <button onClick={this.onHandleClick}>{text}</button>
        );
    }
}
 
export default Button;