import React, { Component } from 'react';
import createHistory from 'history/createMemoryHistory';
import { Router, Route, Switch, Link } from 'react-router-native';

import Drawer from 'react-native-drawer';
import { Menu } from '../components';

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

    this.history = createHistory({
      initialEntries: [ '/' ]
    });

    this.checkForUser = this.checkForUser.bind(this);
    this.getUserConfirmation = this.getUserConfirmation.bind(this);
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
    this.goToSetup = this.goToSetup.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  componentWillMount() {
    this.checkForUser();
  }

  goToSetup() {
    let pageCount = this.history.entries.length - 1;
    this.history.canGo(-pageCount);
    this.history.replace('/setup');
  }

  checkForUser() {
    AsyncStorage.getItem('@NatalCharts:loggedInUser')
      .then(req => JSON.parse(req))
      .then((user) => {
        if (user == null || user.error) {
          this.goToSetup();
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
    if (name === "Logout") {
      AsyncStorage.removeItem('@NatalCharts:loggedInUser')
        .then(() => {
          this.goToSetup();
          this._drawer.close();
          this.setState({ logged_in: false, chart: null, person: null });
        })
        .catch((error) => { console.log(error); });
    }
    else {
      this._drawer.close();
    }
  }

  showMenu() {
    this._drawer.open();
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    const disableMenu = this.state.person == null;

    return (
      <Drawer
        type="static"
        content={menu}
        disabled={disableMenu}
        openDrawerOffset={0.4}
        tapToClose={true}
        tweenHandler={Drawer.tweenPresets.parallax}
        ref={(c) => this._drawer = c}>
        <Router history={this.history} getUserConfirmation={this.getUserConfirmation}>
          <Switch style={styles.container}>
            <Route exact path="/chart" history={this.history} render={() =>
              ( <ListingView
                  chart={this.state.chart}
                  person={this.state.person}
                  showSidebar={this.showMenu} /> )} />
            <Route exact path="/setup" history={this.history} render={() =>
              ( <SetupView onComplete={this.checkForUser} /> )} />
            <Route path="/planet/:name" component={PlanetView} history={this.history} />
            <Route path="/sign/:name" component={SignView} history={this.history} />
            <Route path="/" render={() => ( <View /> )} />
          </Switch>
        </Router>
      </Drawer>
    )
  }
}