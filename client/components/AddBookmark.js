import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');

// https://github.com/umairraslam/expense-manager-mern/blob/master/client/components/Add.js
class AddBookmark extends Component {
    constructor() {
        super();
        this.state = {
            item: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewBookmark = this.insertNewBookmark.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleTextChange(event) {
        if (event.target.name == "item") {
            this.setState({
                item: event.target.value
            });
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState(({ 
            modalIsOpen: false, 
            item: '',
            messageFromServer: ''
        }));
    }

    onClick(event) {
        this.insertNewBookmark(this);
    }

    insertNewBookmark(event) {
        axios.post('/add',
        querystring.stringify({
            item: event.state.item
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
                            to={{pathname: '/'}}
                            style={{textDecoration: 'none'}}>
                            <Button 
                                bsStyle='danger'
                                bsSize='mini'
                                onClick={this.closeModal}>
                                <span className='closebtn glyphicon glyphicon-remove'></span>                        
                            </Button> 
                        </Link><br/>
                        <fieldset>
                            <label for="item">Drink/Cafe:</label>
                            <input 
                                type='text' 
                                id='item' 
                                name='item' 
                                value={this.state.item}
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
                                to={{pathname: '/'}}
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

export default AddBookmark;