import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { string, bool, number } from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends Component {
    
    static propTypes = {
        _id: string.isRequired,
        url: string.isRequired,
        shortUrl: string.isRequired,
        userId: string.isRequired,
        visible: bool.isRequired,
        visitedCount: number.isRequired,
        lastVisitedAt: number
    }

    state = {
        justCopied: false
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.copy);

        this.clipboard.on('success', () => {
            this.setState(prevState => ({
                justCopied: !prevState.justCopied
            }))

            setTimeout(() => {
                this.setState(prevState => ({
                    justCopied: !prevState.justCopied
                }))
            }, 1000)

        }).on('error', () => {
            alert('Unable to copy link')
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    handleClick = () => {
        Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
    }

    renderStats = () => {
        const { visitedCount, lastVisitedAt } = this.props;
        const visitMessage = visitedCount === 1 ? "visit" : "visits"; 
        let visitedMessage = null;

        if ( typeof lastVisitedAt === 'number' ) {
            visitedMessage = `(visited ${ moment(lastVisitedAt).fromNow() })`
        }

        
        return (
          <p>
            {`${visitedCount} - ${visitMessage} ${visitedMessage}`}
          </p>
        )
    }

    render() {
        const { 
            url, 
            shortUrl, 
            visible, 
            lastVisitedAt, 
            visitedCount 
        } = this.props;

        return (
          <div>
            <h3>{url}</h3>
            <p>{shortUrl}</p>
            {this.renderStats()}
            <a href={shortUrl} target="_blank" >Visit</a>
            <p>{visible.toString()}</p>
            <button ref={(el) => { this.copy = el }} data-clipboard-text={shortUrl} >
              {this.state.justCopied ? "Copied" : "Copy"}
            </button>
            <button onClick={this.handleClick} >
              { visible ? "Hide" : "Unhide" }
            </button>
          </div>
        );
    }
}