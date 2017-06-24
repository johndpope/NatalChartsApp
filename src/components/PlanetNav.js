import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-native';
import SvgImage from './SvgImage';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';

import { PLANET_SORT_ORDER, PLANETS_WITH_INFO } from '../static';

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    top: 80,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  img: {
    marginLeft: 5,
    marginRight: 5
  },
  navText: {
    fontSize: 52,
    color: '#000',
    textAlignVertical: 'center',
    includeFontPadding: false
  }
});

export default class PlanetNav extends Component {
  static propTypes = {
    current: React.PropTypes.number.isRequired,
    onLeft: React.PropTypes.func.isRequired,
    onRight: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    let name = PLANET_SORT_ORDER[this.props.current];

    return (
      <View style={styles.nav}>
        <TouchableOpacity onPress={this.props.onLeft} style={styles.poop}>
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>
        <SvgImage width="50" height="50" style={styles.img} source={{uri: PLANETS_WITH_INFO[name].icon}} />
        <TouchableOpacity onPPress={this.props.onRight}>
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      </View>
    )
  }
}