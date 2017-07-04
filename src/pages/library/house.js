import React, { Component } from 'react';

import { Header, SvgImage } from '../../components/';
import { HOUSES_WITH_INFO } from '../../static';

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
    marginBottom: 10,
    textAlign: 'center'
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

export default class HouseView extends Component {
  constructor(props) {
    super(props);

    let houseName = props.match.params.name;
    let house = HOUSES_WITH_INFO[houseName];

    this.state = {
      houseName: houseName,
      house: house
    };

    this.onBackPress = this.onBackPress.bind(this);

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    this.props.history.goBack();
    return true;
  }

  render() {
    let house = this.state.house;
    return (
      <View style={styles.container}>
        <Header onBackPress={this.onBackPress} />

        <View style={styles.page}>
          <Text style={styles.title}>{house.title}</Text>
          <Text style={styles.title}>{house.description}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Ruling Planet: {house.ruling_planet}</Text>
            <Text style={styles.text}>Ruling Sign: {house.ruling_sign}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Houses are like...</Text>
          </View>
        </View>
      </View>
    )
  }
};
