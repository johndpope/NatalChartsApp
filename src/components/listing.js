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
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: '#000'
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
    marginRight: 20,
    paddingBottom: 80
  },
  textRow: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: '#000'
  },
  textRowSmall: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000'
  },
  mainSection: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  section: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  headerText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5
  },
  row: {
    marginTop: 10,
    marginBottom: 10
  },
  setupButton: {
    marginTop: 10
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
});

const Title = ({text, ...props}) => (
  <Text style={styles.title}>{text}</Text>
);

const Row = ({text, ...props}) => (
  <Text style={styles.textRow}>{text}</Text>
);

const ShortRow = ({text, ...props}) => (
  <Text style={styles.textRowSmall}>{text}</Text>
);

const PageHeader = ({name, planet, ...props}) => (
  <View style={styles.center}>
    <Title text={name} />
    {planet.icon &&
      <SvgImage styles={styles.icon} width="80" height="80" source={{uri: planet.icon}} />
    }
    <Row text={planet.title} />
    <Row text={planet.description} />
  </View>
);

const SignInfo = ({name, sign, planetName, ...props}) => (
  <View style={styles.mainSection}>
    <Row text={name} />
    <SvgImage style={styles.row} width="60" height="60" source={{uri: sign.icon}} />
    <Row text={sign.title} />
    <View>
      <ShortRow text={"Element: " + sign.element} />
      <ShortRow text={"Quality: " + sign.quality} />
      <ShortRow text={"Ruler: " + sign.ruler} />
    </View>
    <Row text={`A few lines about ${name} and ${planetName} in ${name} should go here. Traits, ways to spot one, some quotes maybe?`} />
  </View>
);

const HouseInfo = ({name, house, ...props}) => (
  <View style={styles.section}>
    <ShortRow text={`${name} in ${house.title}.`} />
    <ShortRow text={`${house.title}: ${house.description}`} />
  </View>
);

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
          <PageHeader name={page.name} planet={planetInfo} />
          <SignInfo planetName={page.name} name={planet.sign} sign={sign} />
          <HouseInfo name={page.name} house={houseInfo} />
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
          <Text style={styles.headerText}>{birthtime}</Text>
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