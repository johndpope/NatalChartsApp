import React, { Component } from 'react';

import { Header, SvgImage } from '../../components/';
import { PLANET_SORT_ORDER, SIGNS_WITH_INFO, PLANETS_WITH_INFO, HOUSES_WITH_INFO } from '../../static';

import { Link } from 'react-router-native';

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

export default class SignView extends Component {
  constructor(props) {
    super(props);

    let signName = props.match.params.name;
    let sign = SIGNS_WITH_INFO[signName];

    this.state = {
      signName: signName,
      sign: sign
    };

    this.onBackPress = this.onBackPress.bind(this);
    this.history = this.props.history;

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    this.history.goBack();
    return true;
  }

  render() {
    let name = this.state.signName;
    let sign = this.state.sign;
    let history = this.props.history;

    return (
      <View style={styles.container}>
        <Header onBackPress={this.onBackPress} />
        <View style={styles.page}>
          <Text style={styles.title}>{`${name} - ${sign.title}`}</Text>
          {sign.icon &&
            <SvgImage style={styles.icon} width="80" height="80" source={{uri: sign.icon}} />
          }
          <Text style={styles.text}>{sign.description}</Text>
          <View>
            <Text style={styles.text}>Element: {sign.element}</Text>
            <Text style={styles.text}>Quality: {sign.quality}</Text>
            <Text style={styles.text}>Ruler: {sign.ruler}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Signs are like...</Text>
          </View>
        </View>
      </View>
    )
  }
};
