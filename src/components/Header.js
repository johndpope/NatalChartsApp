import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-native';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: (Platform.OS === 'ios') ? 10 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    padding: 10
  },
  buttonText: {
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
    let leftText = this.props.leftText ? this.props.leftText : "‹ Back";
    let rightText = this.props.rightText;
    let titleText = this.props.titleText;

    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.onBackPress}>
            <Text style={styles.buttonText}>{leftText}</Text>
        </TouchableOpacity>
        {titleText &&
          <Text style={styles.titleText}>{titleText}</Text>
        }
        {rightText &&
          <TouchableOpacity
            style={styles.button}
            onPress={this.props.onRightPress}>
              <Text style={styles.buttonText}>{rightText}</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}