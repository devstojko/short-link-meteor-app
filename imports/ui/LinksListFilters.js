import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends Component {

    state = {
        showVisible: true
    }

    onChange = (e) => {
        Session.set('showVisible', !e.target.checked);
    }

    componentDidMount() {
        this.showVisibleTracker = Tracker.autorun(() => {
            this.setState({ showVisible: Session.get('showVisible') })
        })
    }

    componentWillUnmount() {
        this.showVisibleTracker.stop();
    }

    render() {
        return (
          <div>
            <label>
              <input
                type="checkbox"
                checked={!this.state.showVisible}
                onChange={this.onChange}
              />
                show hidden links
            </label>
          </div>
        )
    }
}