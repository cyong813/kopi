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
        this.delete = this.delete.bind(this);
    }

    onClick(event) {
        this.delete(this);
    }

    delete(event) {
        axios.get('/delete?id='+event.state.id)
            .then(function(response) {

            });
    }

    componentDidMount() {
        this.setState({id: this.props.bookmark._id})
    }

    render() {
        return (
            <Button 
                bsStyle='danger'
                bsSize='small'
                onClick={this.onClick}>
                <Link 
                    to={{pathname: '/'}}
                    style={{textDecoration: 'none'}}>
                    <span className='glyphicon glyphicon-remove'></span>
                </Link>
            </Button>
        )
    }
}

export default DeleteBookmark;