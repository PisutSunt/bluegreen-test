import React, { Component } from 'react'
import Box from './Box'
import List from './List'
import axios from 'axios'

export default class Facade extends Component {
    constructor(props) {
        super()
        this.state = {
            item: [],
            currenItem: {
                text: '',
                key: ''
            }
        }
        this.update()
    }

    handleInput = e => {
        const txtIn = e.target.value
        const currenItem = {
            text: txtIn,
            key: Date.now()
        }
        this.setState({currenItem: currenItem})
    }

    add = e => {
        e.preventDefault()
        const newItem = this.state.currenItem
        if (newItem.text !== '') {
            const item = [...this.state.item, newItem]
            this.setState({
                item: item,
                currenItem: {
                    text: '',
                    key: ''
                }
            })
            axios.post('/insert', newItem).catch(err => {
                console.error(err)
            })
        }
    }

    delete = (key) => {
        const filteredItem = this.state.item.filter(item => {
            if (item.key !== key) {
                return true
            }
            console.log(item)
            axios.post('/remove', item)
                .catch(err => { console.error(err) }
            )
            return false
        })
        this.setState({
            item: filteredItem
        })
    }

    update = () => {
        axios.get('/startup')
            .then(response => response.json())
            .then(data => this.setState({ item: data.data }))
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Todo App</p>
                    <Box
                        add={this.add}
                        inputElement={this.inputElement}
                        handleInput={this.handleInput}
                        currentItem={this.state.currenItem}/>
                    <List
                        entries={this.state.item}
                        delete={this.delete}/>
                </header>
            </div>
        )
    }
}