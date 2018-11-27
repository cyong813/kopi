import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');

// ref: https://github.com/umairraslam/expense-manager-mern/blob/master/client/components/Add.js

class AddDrinkBookmark extends Component {
    constructor() {
        super();
        this.state = {
            drink_name: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewDrinkBookmark = this.insertNewDrinkBookmark.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleTextChange(event) {
        if (event.target.name == "drink_name") {
            this.setState({
                drink_name: event.target.value
            });
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState(({ 
            modalIsOpen: false, 
            drink_name: '',
            messageFromServer: ''
        }));
    }

    onClick(event) {
        this.insertNewDrinkBookmark(this);
    }

    insertNewDrinkBookmark(event) {
        axios.post('/addDrinkBookmark',
        querystring.stringify({
            drink_name: event.state.drink_name
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response) {
            event.setState({
                messageFromServer: response.data
            });
        });
    }

    render() {
        if (this.state.messageFromServer == '') {
            return (
                <div>
                    <Button 
                        bsStyle='default'
                        bsSize='xsmall'
                        onClick={this.openModal}>
                        <i class="fas fa-coffee"></i>                    
                    </Button> 
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel='Add'
                        className='Modal'>
                        <Link 
                            to={{pathname: '/bookmarks'}}
                            style={{textDecoration: 'none'}}>
                            <Button 
                                bsStyle='danger'
                                bsSize='mini'
                                onClick={this.closeModal}>
                                <span className='closebtn glyphicon glyphicon-remove'></span>                        
                            </Button> 
                        </Link><br/>
                        <fieldset>
                            <label for="drink_name">Drink:</label>
                            <input 
                                type='text' 
                                id='drink_name' 
                                name='drink_name' 
                                value={this.state.drink_name}
                                onChange={this.handleTextChange}>
                            </input>
                        </fieldset>

                        <div className='button-center'>
                            <br/>
                            <Button 
                                bsStyle='success' 
                                bsSize='small'
                                onClick={this.onClick}>Add    
                            </Button>
                        </div>
                    </Modal>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button 
                        bsStyle='default'
                        bsSize='xsmall'
                        onClick={this.openModal}>
                        <i class="fas fa-coffee"></i>   
                    </Button>
                    <Modal 
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel='Add'
                        className='Modal'>
                        <div className='button-center'>
                            <h3>{this.state.messageFromServer}</h3>
                            <Link 
                                to={{pathname: '/bookmarks'}}
                                style={{textDecoration: 'none'}}>
                                <Button 
                                    bsStyle='success'
                                    bsSize='mini'
                                    onClick={this.closeModal}>
                                    Close    
                                </Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            )
        }
    }
}

export default AddDrinkBookmark;