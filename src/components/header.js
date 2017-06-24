import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-native';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
  View
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: (Platform.OS === 'ios') ? 10 : 0,
    paddingLeft: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  backButton: {
    marginTop: 10
  },
  backButtonText: {
    fontSize: 14
  },
  titleText: {
    fontFamily: 'Karla-Regular',
    fontSize: 18
  }
});

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let backText = this.props.backText ? this.props.backText : "‹ Back";
    let titleText = this.props.titleText;

    return (
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.backButton}
          onPress={this.props.onBackPress}
          underlayColor='#f0f4f7'>
            <Text style={styles.backButtonText}>{backText}</Text>
        </TouchableHighlight>
        {titleText &&
          <Text style={styles.titleText}>{titleText}</Text>
        }
      </View>
    )
  }
}