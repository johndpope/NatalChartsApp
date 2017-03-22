import React, { Component } from 'react';

import {
  AsyncStorage,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TextInput,
  Linking,
  TouchableHighlight,
  ScrollView,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20
  },
  headerExplainText: {
    fontSize: 12,
    textAlign: 'center',
    margin: 5,
    marginTop: 0
  },
  listRow: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8E8E8E'
  },
  listItemPlanet: {
    fontSize: 18,
    alignSelf: 'flex-start'
  },
  listItemSign: {
    fontSize: 18,
    flexGrow: 1,
    textAlign: 'center'
  },
  listItemHouse: {
    fontSize: 16,
    alignSelf: 'flex-end'
  }
});

const PLANET_SORT_ORDER = ['Sun', 'Moon', 'Ascendant', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
const HOUSE_DISPLAY_NAMES = {
  'House1':  {num: 1,  roman: 'I'},
  'House2':  {num: 2,  roman: 'II'},
  'House3':  {num: 3,  roman: 'III'},
  'House4':  {num: 4,  roman: 'IV'},
  'House5':  {num: 5,  roman: 'V'},
  'House6':  {num: 6,  roman: 'VI'},
  'House7':  {num: 7,  roman: 'VII'},
  'House8':  {num: 8,  roman: 'VIII'},
  'House9':  {num: 9,  roman: 'IX'},
  'House10': {num: 10, roman: 'X'},
  'House11': {num: 11, roman: 'XI'},
  'House12': {num: 12, roman: 'XII'}
};

const ListSeparator = () => <View style={styles.listSeparator} />;

export default class ListingView extends Component {
  constructor(props) {
    super(props);

    // Okay so we want our list to show Sun/Moon/Rising then the rest of
    // the planets, so let's make a really simple list of objects that
    // contains JUST that info
    list_items = [];
    for (let planet of Object.keys(props.chart.planets)) {
      list_items.push({
                      'key': planet,
                      'planet': planet,
                      'sign': props.chart.planets[planet].planet.sign,
                      'house': props.chart.planets[planet].house
                      });
    }

    list_items.push({
      'key': 'Ascendant',
      'planet': 'Ascendant',
      'sign': props.chart.houses['House1'].sign,
      'house': 'House1'

    });
    list_items.sort((a, b) => PLANET_SORT_ORDER.indexOf(a.planet) - PLANET_SORT_ORDER.indexOf(b.planet));

    this.state = {
      list_items: list_items
    }

    this.renderListItem = this.renderListItem.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress(item) {
    if(item.planet == 'Ascendant') {
      return;
    }
    var url = "http://freespiritedmind.com/natal-";
    url += item.planet.toLowerCase();
    url += "-in-the-";

    let house_num = HOUSE_DISPLAY_NAMES[item.house].num;

    url += house_num;

    switch(house_num) {
      case 1:
        url += "st";
        break;
      case 2:
        url += "nd";
        break;
      case 3:
        url += "rd";
        break;
      default:
        url += "th";
        break;
    };

    url += "-house/";

    Linking.openURL(url);
  }

  renderListItem({item, index}) {
    return (
      <TouchableHighlight onPress={() => { this.onItemPress(item); }} underlayColor='#F06292'>
        <View style={styles.listRow}>
          <Text style={styles.listItemPlanet}>{item.planet}</Text>
          <Text style={styles.listItemSign}>{item.sign}</Text>
          <Text style={styles.listItemHouse}>House {HOUSE_DISPLAY_NAMES[item.house].roman}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    let person = this.props.person;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Hi there, {person.name}</Text>
        <Text style={styles.headerExplainText}>So far clicking on the items below simply opens freespiritedmind's description of that body's natal house positioning. Sorry all the articles say "he". There's no article for ascendant / rising since those aren't planets.</Text>
        {this.state.list_items && 
          <FlatList
            data={this.state.list_items}
            renderItem={this.renderListItem} />
        }
      </View>
    )
  }
}