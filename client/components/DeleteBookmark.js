import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// https://github.com/umairraslam/expense-manager-mern/blob/master/client/components/Delete.js
class DeleteBookmark extends Component {
    constructor() {
        super();
        this.state = {id: ''};
        this.onClick = this.onClick.bind(this);
        this.deleteBookmark = this.deleteBookmark.bind(this);
    }

    onClick(event) {
        this.deleteBookmark(this);
    }

    deleteBookmark(event) {
        axios.get('/deleteBookmark?id='+event.state.id)
            .then(function(response) {

            });
    }

    componentDidMount() {
        this.setState({id: this.props.bookmark._id})
    }

    componentWillReceiveProps() {
        this.setState({id: this.props.bookmark._id})
    }

    render() {
        return (
            <Button 
                bsStyle='danger'
                bsSize='xsmall'
                onClick={this.onClick}>
                <Link 
                    to={{pathname: '/bookmarks'}}
                    style={{textDecoration: 'none'}}>
                </Link>
                <span className='glyphicon glyphicon-remove'></span>
            </Button>
        )
    }
}

export default DeleteBookmark;