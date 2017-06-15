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

import { PLANET_SORT_ORDER, SIGNS_WITH_INFO, PLANETS_WITH_INFO, HOUSES_WITH_INFO } from '../static';

import { Link } from 'react-router-native'


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E7E7E7',
    paddingTop: 10
  },
  header: {
    height: 60,
    paddingTop: 10,
    paddingLeft: 10
  },
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000'
  },
  mainSection: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    marginTop: 10
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
  row: {
    marginTop: 10,
    marginBottom: 10
  },
  setupButton: {
    
  }
});

export default class ListingView extends Component {
  constructor(props) {
    super(props);

    var pages = [];
    for (var i = 0; i < PLANET_SORT_ORDER.length; i++) {
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
    let planetInfo = PLANETS_WITH_INFO[page.name];
    let houseInfo = HOUSES_WITH_INFO[page.val.house];

    return (
      <ScrollView key={page.name}>
        <View style={styles.page}>
          {planetInfo.icon && 
            <SvgImage styles={styles.row} width="80" height="80" source={{uri: planetInfo.icon}} />
          }
          <Text style={[styles.pageHeader, styles.text, styles.row]}>{page.name} - {planetInfo.title}</Text>
          <Text style={[styles.pageHeader, styles.text]}>{planetInfo.description}</Text>
          <View style={styles.mainSection}>
            <SvgImage style={styles.row} width="60" height="60" source={{uri: sign.icon}} />
            <Text style={styles.text}>{planet.sign}</Text>
            <Text style={styles.text}>{sign.title}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Element: {sign.element}</Text>
            <Text style={styles.text}>Quality: {sign.quality}</Text>
            <Text style={styles.text}>Ruler: {sign.ruler}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>A few lines about {planet.sign} and {page.name} in {planet.sign} should go here. Traits, ways to spot one, some quotes maybe?</Text>
            <Text style={styles.text}>{page.name} in {houseInfo.title}.</Text>
            <Text style={styles.text}>{houseInfo.title}: {houseInfo.description}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }

  render() {
    let person = this.props.person;
    let birthtime = moment.unix(person.birthdate).utc().format("dddd, MMMM Do YYYY, h:mm a");

    let pages = this.state.pages.map((page, key) => this.renderPage(page));

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Link
            to={`/setup`}
            style={styles.setupButton}
            underlayColor='#f0f4f7'>
              <Text>Log out</Text>
          </Link>
          <Text style={styles.headerExplainText}>{birthtime}</Text>
        </View>
        {this.state.pages && 
          <Swiper showsButtons>
            {pages}
          </Swiper>
        }
      </View>
    )
  }
}