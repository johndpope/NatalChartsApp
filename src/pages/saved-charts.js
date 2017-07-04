import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import store from 'react-native-simple-store';
import moment from 'moment';
import Api from '../api';

import { Header, SvgImage } from '../components/';
import { SIGNS_WITH_INFO } from '../static';

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 10 : 0,
    backgroundColor: '#EFEFEF'
  },
  page: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    fontFamily: 'Karla-Regular',
    fontSize: 22,
    marginBottom: 10
  },
  text: {
    fontFamily: 'Karla-Regular',
    fontSize: 16
  },
  listItemContainer: {
    marginTop: 5,
    backgroundColor: '#EFEFEF'
  },
  listItem: {
    justifyContent: 'center',
    padding: 10
  },
  rowIcon: {
    position: 'absolute',
    right: 10
  }
});

export default class SavedCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charts: [],
      list_items: []
    };

    this.parseCharts = this.parseCharts.bind(this);
    this.showChart = this.showChart.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onAddChart = this.onAddChart.bind(this);
    this.onEditChart = this.onEditChart.bind(this);
    this.onDeleteChart = this.onDeleteChart.bind(this);
    this.deleteChart = this.deleteChart.bind(this);
  }

  componentWillMount() {
    store.get('savedCharts')
      .then((res) => {
        this.parseCharts(res);
      });
  }

  onBackPress() {
    this.props.history.goBack();
  }

  onAddChart() {
    this.props.history.push('/add');
  }

  parseCharts(charts) {
    list_items = [];
    for(var i = 0; i < charts.length; i++) {
      list_items.push({
        name: charts[i].person.name,
        birthdate: charts[i].person.birthdate,
        sun: charts[i].chart.planets.Sun.planet.sign
      });
    };

    this.setState({charts: charts, list_items: list_items});
  }

  showChart(item) {
    this.props.history.push('/chart/' + item.name);
  }

  onEditChart(item) {
    Alert.alert(`#TODO: Edit ${item.name}'s chart`);
  }

  onDeleteChart(item) {
    Alert.alert(`Delete ${item.name}'s Chart?`, ``,
      [
        {text: "Cancel", style: 'cancel'},
        {text: "Delete", style: 'destructive', onPress: () =>
          {
            this.deleteChart(item);
          }
        }
      ]
    );
  }

  deleteChart(item) {
    store.get('savedCharts')
      .then((res) => {
        var toDelete = -1;
        for(var i = 0; i < res.length; i++) {
          if (res[i].person.name === item.name && res[i].person.birthdate === item.birthdate) {
            toDelete = i;
            break;
          }
        }

        if (toDelete != -1) {
          res.splice(toDelete);
          this.parseCharts(res);
          store.save('savedCharts', res);
        }
      });
  }

  renderListItem({item, index}) {
    let displayTime = moment.unix(item.birthdate).utc().format("MMMM Do YYYY, h:mm a");
    let sun = SIGNS_WITH_INFO[item.sun];

    let rowActions = [
      {
        text: "Edit",
        onPress: () => { this.onEditChart(item) }
      },
      {
        text: "Delete",
        type: "delete",
        onPress: () => { this.onDeleteChart(item) }
      }
    ];

    return (
        <Swipeout style={styles.listItemContainer} right={rowActions} autoClose={true}>
          <TouchableOpacity onPress={() => this.showChart(item)}>
            <View style={styles.listItem}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{displayTime}</Text>
              <SvgImage style={styles.rowIcon} width="25" height="25" source={{uri: sun.icon}} />
            </View>
          </TouchableOpacity>
        </Swipeout>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header titleText={'Saved Charts'}
          onBackPress={this.onBackPress}
          rightText={'Add'}
          onRightPress={this.onAddChart} />
        <View style={styles.page}>
          {this.state.charts &&
            <FlatList
              data={this.state.list_items}
              keyExtractor={(item, index) => item.birthdate}
              renderItem={this.renderListItem} />
          }
        </View>
      </View>
    )
  }
}