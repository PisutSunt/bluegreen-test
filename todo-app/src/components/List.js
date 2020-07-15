import React, { Component } from 'react'

export default class List extends Component {
    createTask = (item) => {
        return (
            <div className="task" key={item.key}>
                {item.text}
                <button onClick={() => this.props.delete(item.key)}>x</button>
            </div>
        )
    }
    render() {
        const todoEntries = this.props.entries
        const itemList = todoEntries.map(this.createTask)
        return (
            <div className="list">
                {/* <ul>{itemList}</ul> */}
                {itemList}
            </div>
        )
    }
}