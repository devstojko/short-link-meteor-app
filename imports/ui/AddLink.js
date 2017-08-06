import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

// visitedCount 0 1 2 3
// lastVisitedAt null

export default class AddLink extends Component {

    state = {
        url: '',
        isOpen: false,
        error: ''
    }

    onSubmit = (e) => {
        const { url } = this.state;

        e.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.closeModal();
            } else {
                this.setState({ error: err.reason })
            }
        });

    }

    onChange = () => {
        this.setState({
            url: e.target.value
        });
    }

    openModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    closeModal = () => {

        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            url: '',
            error: ''
        }))
    }

    inputFocus = () => {
        return this.addLinkInput.focus();
    }

    render() {
        const { error } = this.state;
        return (
          <div>
            <p>Add Link</p>
            <button onClick={this.openModal} >Add Link</button>
            <Modal 
              isOpen={this.state.isOpen} 
              contentLabel="Add link"
              onAfterOpen={this.inputFocus}
              onRequestClose={this.closeModal} 
            >
              <h1>Add Link</h1>
              { error && <p>{ error }</p> }
              <form onSubmit={this.onSubmit}>
                <input 
                  type="text"
                  ref={(el) => { this.addLinkInput = el }} 
                  placeholder="URL"
                  value={this.state.url}
                  onChange={this.onChange}
                />

                <button>Add Link</button>
              </form>
              <button onClick={this.closeModal} >close</button>
            </Modal> 
          </div>
        );
    }
}