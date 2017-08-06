import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import Links from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            links: []
        }
    }
    componentDidMount() {
        console.log('component did mount');
        
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links', (params) => {
                
            })

            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({links});
        })
    }
    componentWillUnmount() {
        console.log('component will unmount');
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        return this.state.links.map((link, i) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
        })
    }
    render() {
        return (
          <div>
            <p>Links List</p>
            <div>
              {this.renderLinksListItems()}
            </div>
          </div>
        );
    }
}