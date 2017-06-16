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
  TouchableHighlight,
  Linking,
  ScrollView,
  Platform,
  View
} from 'react-native';

import { PLANET_SORT_ORDER, SIGNS_WITH_INFO, PLANETS_WITH_INFO, HOUSES_WITH_INFO } from '../static';

import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E7E7E7',
    paddingTop: (Platform.OS === 'ios') ? 10 : 0
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: '#000'
  },
  header: {
    height: 60,
    paddingTop: (Platform.OS === 'ios') ? 10 : 0,
    paddingLeft: 10
  },
  page: {
    flex: 1,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 100
  },
  textRow: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: '#000'
  },
  textRowBottomOnly: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000'
  },
  textRowSmall: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000'
  },
  textSection: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  mainSection: {
    marginTop: 10,
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

const Title = ({children, ...props}) => (
  <Text style={styles.title}>{children}</Text>
);

const Row = ({children, ...props}) => (
  <Text style={styles.textRow}>{children}</Text>
);

const ShortRow = ({children, ...props}) => (
  <Text style={styles.textRowSmall}>{children}</Text>
);

const TopRow = ({children, ...props}) => (
  <Text style={styles.textRowBottomOnly}>{children}</Text>
);

const PageHeader = ({name, planet, sign, signName, ...props}) => (
  <View style={styles.center}>
    <Title>{name}</Title>
    {planet.icon &&
      <SvgImage styles={styles.icon} width="80" height="80" source={{uri: planet.icon}} />
    }
    <Row>{signName}</Row>
    <SvgImage style={styles.row} width="60" height="60" source={{uri: sign.icon}} />
  </View>
);

const SignInfo = ({signName, sign, planetName, planet, ...props}) => (
  <View style={styles.mainSection}>
    <Row>Your {planetName}, {planet.title}, is in {signName}, {sign.title}.</Row>
    <View>
      <ShortRow>Element: {sign.element}</ShortRow>
      <ShortRow>Quality: {sign.quality}</ShortRow>
      <ShortRow>Ruler: {sign.ruler}</ShortRow>
    </View>
    <Row>A few lines about {planetName} in {signName} should go here. Personality traits, ways to spot one in the wild, some advice, maybe?</Row>
  </View>
);

const HouseInfo = ({name, house, ...props}) => (
  <View style={styles.section}>
    <ShortRow>{name} in {house.title}.</ShortRow>
    <ShortRow>{house.title}: {house.description}</ShortRow>
  </View>
);

const AspectRow = ({aspect, ...props}) => {
  let firstName = aspect.first === "House1" ? "Ascendant" : aspect.first;
  let secondName = aspect.second;
  let aspectType = aspect.type_name;
  let orb = aspect.orb.toFixed(2);

  return (
    <ShortRow>{firstName} {aspectType} {secondName} ({orb}°)</ShortRow>
  )
};

const AspectInfo = ({aspects, ...props}) => {
  if (!aspects) { return <View />; }
  return (
    <View style={styles.section}>
      <TopRow>Aspects</TopRow>
      {aspects.map((aspect, key) => {
        return (
          <AspectRow key={key} aspect={aspect} />
        )
      })}
    </View>
  )
};

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
          <PageHeader name={page.name} planet={planetInfo} sign={sign} signName={planet.sign} />
          <SignInfo planetName={page.name} planet={planetInfo} signName={planet.sign} sign={sign} />
          <HouseInfo name={page.name} house={houseInfo} />
          <AspectInfo aspects={page.val.aspects} />
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