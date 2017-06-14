import React, { Component } from 'react';
import SetupView from './setup';
import ListingView from './listing';
import createHistory from 'history/createMemoryHistory'

import {
  AsyncStorage,
  StyleSheet,
  Button,
  Text,
  TextInput,
  ScrollView,
  View,
  Alert
} from 'react-native';

import { Router, Route, Switch, Link } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000'
  }
});

export default class IndexView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged_in: false
    };

    this.history = createHistory();

    this.checkForUser = this.checkForUser.bind(this);
    this.getUserConfirmation = this.getUserConfirmation.bind(this);
  }

  componentWillMount() {
    this.checkForUser();
  }

  checkForUser() {
    AsyncStorage.getItem('@NatalCharts:loggedInUser')
      .then(req => JSON.parse(req))
      .then((user) => {
        if (user == null) { return; }
        console.log("found a user");
        this.setState({logged_in: true, chart: user.chart, person: user.person});
        this.history.replace('/chart');
      })
      .catch((error) => { console.log(error); });
  }

  getUserConfirmation(message, callback) {
    Alert.alert('Confirm', message, [
      { text: 'Cancel', onPress: () => callback(false) },
      { text: 'OK', onPress: () => callback(true) }
    ])
  }

  render() {
    console.log(this.history.location);
    return (
      <Router history={this.history} getUserConfirmation={this.getUserConfirmation}>
        <Switch style={styles.container}>
          <Route path="/chart" render={(props) => 
            ( <ListingView chart={this.state.chart} person={this.state.person} /> )} />
          <Route path="/" history={this.history} render={(props) =>
            ( <SetupView onComplete={this.checkForUser} {...props} /> )} />
        </Switch>
      </Router>
    )
  }
}