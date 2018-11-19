import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');

class AddBookmark extends Component {
    constructor() {
        super();
        this.state = {
            item: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewBookmark = this.insertNewBookmark.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {

    }
}

export default AddBookmark;