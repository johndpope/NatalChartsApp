import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Swipeout from 'react-native-swipeout';
import store from 'react-native-simple-store';
import Api from '../api';

import { Header, SvgImage } from '../components/';
import { SIGNS_WITH_INFO } from '../static';

import {
  Alert,
  FlatList,
  StyleSheet,
  Button,
  Text,
  TextInput,
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

    this.getCharts = this.getCharts.bind(this);
    this.showChart = this.showChart.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onAddChart = this.onAddChart.bind(this);
    this.onEditChart = this.onEditChart.bind(this);
    this.onDeleteChart = this.onDeleteChart.bind(this);
  }

  componentWillMount() {
    this.getCharts();
  }

  onBackPress() {
    this.props.history.goBack();
  }

  onAddChart() {
    this.props.history.push('/add');
  }

  getCharts() {
    store.get('savedCharts')
      .then((res) => {
        list_items = [];
        for(var i = 0; i < res.length; i++) {
          list_items.push({
            'name': res[i]['person']['name'],
            'birthdate': res[i]['person']['birthdate'],
            'sun': res[i]['chart']['planets']['Sun']['planet']['sign']
          });
        };

        this.setState({charts: res, list_items: list_items});
      });
  }

  showChart(index) {
    let name = this.state.charts[index]['person']['name'];
    this.props.history.push('/chart/' + name);
  }

  onEditChart(index) {
    let name = this.state.charts[index].person.name;
    Alert.alert(`#TODO: Edit ${name}'s chart`);
  }

  onDeleteChart(index) {
    let name = this.state.charts[index].person.name;
    Alert.alert(`Delete ${name}'s Chart?`, ``,
      [
        {text: "Delete", style: 'destructive', onPress: () =>
          { Alert.alert(`#TODO: Delete ${name}'s chart`) }
        }
      ]
    );
  }

  renderListItem({item, index}) {
    let displayTime = moment.unix(item.birthdate).utc().format("MMMM Do YYYY, h:mm a");
    let sun = SIGNS_WITH_INFO[item.sun];

    let rowActions = [
      {
        text: "Edit",
        onPress: () => { this.onEditChart(index) }
      },
      {
        text: "Delete",
        type: "delete",
        onPress: () => { this.onDeleteChart(index) }
      }
    ];

    return (
        <Swipeout style={styles.listItemContainer} right={rowActions} autoClose={true}>
          <TouchableOpacity onPress={() => this.showChart(index)}>
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