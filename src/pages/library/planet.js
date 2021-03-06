import React, { Component } from 'react';

import { Header, SvgImage } from '../../components/';
import { PLANET_SORT_ORDER, SIGNS_WITH_INFO, PLANETS_WITH_INFO, HOUSES_WITH_INFO } from '../../static';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  BackHandler,
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
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    alignItems: 'center'
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
  icon: {
    marginBottom: 10
  },
  row: {
    marginTop: 10,
    marginBottom: 10
  }
});

export default class PlanetView extends Component {
  constructor(props) {
    super(props);

    let planetName = props.match.params.name;
    let planet = PLANETS_WITH_INFO[planetName];

    this.state = {
      planetName: planetName,
      planet: planet
    };

    this.onBackPress = this.onBackPress.bind(this);

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    this.props.history.goBack();
    return true;
  }

  render() {
    let name = this.state.planetName;
    let planet = this.state.planet;

    return (
      <View style={styles.container}>
        <Header onBackPress={this.onBackPress} />
        <View style={styles.page}>
          <Text style={styles.title}>{`${name} - ${planet.title}`}</Text>
          {planet.icon &&
            <SvgImage style={styles.icon} width="80" height="80" source={{uri: planet.icon}} />
          }
          <Text style={styles.text}>{planet.description}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Planets control...</Text>
          </View>
        </View>
      </View>
    )
  }
};
