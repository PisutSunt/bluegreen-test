import React, { Component } from 'react'

export default class Box extends Component {
    render() {
        return (
            <div className="box">
                <form onSubmit={this.props.add}>
                    <input 
                        type="text"
                        name="task"
                        placeholder="What will you do?"
                        ref={this.props.inputElement}
                        value={this.props.currentItem.text}
                        onChange={this.props.handleInput}/>
                    <input type="submit" text="Add"/>
                </form>
            </div>
        )
    }
}