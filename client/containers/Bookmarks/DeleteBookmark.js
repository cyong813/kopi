import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// ref: https://github.com/umairraslam/expense-manager-mern/blob/master/client/components/Delete.js

class DeleteBookmark extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            messageFromServer: ''
        };
        this.onClick = this.onClick.bind(this);
        this.deleteBookmark = this.deleteBookmark.bind(this);
    }

    onClickHandler() {
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

    componentDidMount() {
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
                <div className='DeleteBookmark'>
                    <Link 
                        to={{pathname: '/bookmarks'}}
                        style={{textDecoration: 'none'}}>
                        <Button 
                            bsStyle='danger'
                            bsSize='xsmall'
                            onClick={this.onClickHandler}>
                            <span className='glyphicon glyphicon-remove'></span>
                        </Button>
                    </Link>
                </div>
            )
        }
    }
}

export default DeleteBookmark;