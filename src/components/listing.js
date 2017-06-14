import React, { Component } from 'react';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import SvgImage from './SvgImage';

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

import { PLANET_SORT_ORDER, HOUSE_DISPLAY_NAMES, SIGNS_WITH_INFO } from '../static';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E7E7E7'
  },
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5
  },
  headerExplainText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5
  },
  pageHeader: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#000'
  },
  planetRow: {
    marginBottom: 5
  },
  planetText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000'
  }
});

export default class ListingView extends Component {
  constructor(props) {
    super(props);

    var pages = [];
    for (var i = 0; i < 3; i++) {
      let key = PLANET_SORT_ORDER[i];
      pages.push({name: key, val: props.chart.planets[key]});
    }

    this.state = {
      pages: pages
    }
  }

  renderPage(page) {
    let planet = page.val.planet;
    let sign = SIGNS_WITH_INFO[planet.sign];

    return (
      <View style={styles.page} key={page.name}>
        <Text style={[styles.pageHeader, styles.planetText]}>{page.name}</Text>
        <SvgImage style={styles.planetRow} width="50" height="50" source={{uri: sign.icon}} />
        <Text style={styles.planetText}>{planet.sign}</Text>
        <Text style={styles.planetText}>{sign.title}</Text>
        <View style={{marginTop: 10}}>
          <Text style={styles.planetText}>Element: {sign.element}</Text>
          <Text style={styles.planetText}>Quality: {sign.quality}</Text>
          <Text style={styles.planetText}>Ruler: {sign.ruler}</Text>
        </View>
      </View>
    )
  }

  render() {
    let person = this.props.person;
    let birthtime = moment.unix(person.birthdate).utc().format("dddd, MMMM Do YYYY, h:mm a");

    let pages = this.state.pages.map((page, key) => this.renderPage(page));

    return (
      <View style={styles.container}>
        <Text style={styles.headerExplainText}>{birthtime}</Text>
        {this.state.pages && 
          <Swiper showsButtons>
            {pages}
          </Swiper>
        }
      </View>
    )
  }
}