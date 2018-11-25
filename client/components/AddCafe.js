import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');

// https://github.com/umairraslam/expense-manager-mern/blob/master/client/components/Add.js
class AddCafe extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewCafe = this.insertNewCafe.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleTextChange(event) {
        if (event.target.name == "name") {
            this.setState({
                name: event.target.value
            });
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState(({ 
            modalIsOpen: false, 
            name: '',
            messageFromServer: ''
        }));
    }

    onClick(event) {
        this.insertNewCafe(this);
    }

    insertNewCafe(event) {
        axios.post('/addCafe',
        querystring.stringify({
            name: event.state.name
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
                        bsStyle='success'
                        bsSize='small'
                        onClick={this.openModal}>
                        <span className='glyphicon glyphicon-plus'></span>                        
                    </Button> 
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel='Add'
                        className='Modal'>
                        <Link 
                            to={{pathname: '/cafes'}}
                            style={{textDecoration: 'none'}}>
                            <Button 
                                bsStyle='danger'
                                bsSize='mini'
                                onClick={this.closeModal}>
                                <span className='closebtn glyphicon glyphicon-remove'></span>                        
                            </Button> 
                        </Link><br/>
                        <fieldset>
                            <label for="name">Cafe:</label>
                            <input 
                                type='text' 
                                id='name' 
                                name='name' 
                                value={this.state.name}
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
                        bsStyle='success'
                        bsSize='small'
                        onClick={this.openModal}>
                        <span className='glyphicon glyphicon-plus'></span>    
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
                                to={{pathname: '/cafes'}}
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

export default AddCafe;