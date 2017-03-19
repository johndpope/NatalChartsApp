import React, { Component } from 'react';
import SetupView from './setup';
import ListingView from './listing';

import {
  AsyncStorage,
  StyleSheet,
  Button,
  Text,
  TextInput,
  ScrollView,
  View
} from 'react-native';

export default class IndexView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged_in: false
    };

    this.checkForUser = this.checkForUser.bind(this);
  }

  componentWillMount() {
    this.checkForUser();
  }

  checkForUser() {
    AsyncStorage.getItem('@NatalCharts:loggedInUser')
      .then(req => JSON.parse(req))
      .then((user) => {
        this.setState({logged_in: true, chart: user.chart, person: user.person});
      })
      .catch((error) => {});
  }

  // #TODO: I don't know why but no matter if state.logged_in == true this shows the
  // else part. It definitely gets called twice (once on first load, once on async get)
  // and definitely enters the if (this.state.logged_in), but still SetupView :/
  render() {
    if (this.state.logged_in) {
      return <ListingView chart={this.state.chart} person={this.state.person} />
    }

    return <SetupView onComplete={this.checkForUser} />
  }
}