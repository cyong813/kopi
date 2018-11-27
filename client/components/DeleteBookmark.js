import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// https://github.com/umairraslam/expense-manager-mern/blob/master/client/components/Delete.js
class DeleteBookmark extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            messageFromServer: '',
            modalIsOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.deleteBookmark = this.deleteBookmark.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onClick(event) {
        this.deleteBookmark(this);
    }

    deleteBookmark(event) {
        axios.get('/deleteBookmark?id='+event.state.id)
            .then(function(response) {
                event.setState({
                    messageFromServer: response.data
                });
            });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState(({ 
            modalIsOpen: false, 
            id: '',
            messageFromServer: ''
        }));
    }

    componentDidMount() {
        this.setState({id: this.props.bookmark._id})
    }

    componentWillReceiveProps() {
        this.setState({id: this.props.bookmark._id})
    }

    render() {
        if (this.state.messageFromServer == '') {
            return (
                <Link 
                    to={{pathname: '/bookmarks'}}
                    style={{textDecoration: 'none'}}>
                    <Button 
                        bsStyle='danger'
                        bsSize='xsmall'
                        onClick={this.onClick}>
                        <span className='glyphicon glyphicon-remove'></span>
                    </Button>
                </Link>
            )
        }
        else {
            return (
                <div>
                    <Link 
                        to={{pathname: '/bookmarks'}}
                        style={{textDecoration: 'none'}}>
                        <Button 
                            bsStyle='danger'
                            bsSize='xsmall'
                            onClick={this.onClick}>
                            <span className='glyphicon glyphicon-remove'></span>
                        </Button>
                    </Link>
                    <Modal 
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel='Delete'
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

export default DeleteBookmark;