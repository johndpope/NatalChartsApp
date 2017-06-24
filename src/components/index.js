import React, { Component } from 'react';
import createHistory from 'history/createMemoryHistory';
import { Router, Route, Switch, Link } from 'react-router-native';
import SideMenu from 'react-native-side-menu';

import Menu from './menu';
import SetupView from './setup';
import ListingView from './listing';
import PlanetView from './library/planet';
import SignView from './library/sign';

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
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
  }

  componentWillMount() {
    this.checkForUser();
  }

  checkForUser() {
    AsyncStorage.getItem('@NatalCharts:loggedInUser')
      .then(req => JSON.parse(req))
      .then((user) => {
        if (user == null || user.error) { 
          this.history.replace('/setup');
          return;
        }
        this.setState({logged_in: true, chart: user.chart, person: user.person});
        this.history.push('/chart');
      })
      .catch((error) => { console.log(error); });
  }

  getUserConfirmation(message, callback) {
    Alert.alert('Confirm', message, [
      { text: 'Cancel', onPress: () => callback(false) },
      { text: 'OK', onPress: () => callback(true) }
    ])
  }

  onMenuItemSelected(name) {
    console.log(name);
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu menu={menu}>
        <Router history={this.history} getUserConfirmation={this.getUserConfirmation}>
          <Switch style={styles.container}>
            <Route exact path="/chart" history={this.history} render={() => 
              ( <ListingView chart={this.state.chart} person={this.state.person} /> )} />
            <Route exact path="/setup" history={this.history} render={() =>
              ( <SetupView onComplete={this.checkForUser} /> )} />
            <Route path="/planet/:name" component={PlanetView} history={this.history} />
            <Route path="/sign/:name" component={SignView} history={this.history} />
            <Route path="/" render={() => ( <View /> )} />
          </Switch>
        </Router>
      </SideMenu>
    )
  }
}