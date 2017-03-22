import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import Api from '../api';

import {
  AsyncStorage,
  AppRegistry,
  Alert,
  StyleSheet,
  Button,
  Text,
  TextInput,
  ScrollView,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20
  },
  rowContainer: {
    margin: 10
  },
  inputLabel: {
    fontSize: 16,
    marginLeft: 5
  },
  inputField: {
    width: '100%'
  },
  inputTextField: {
    height: 40,
    borderColor: '#8E8E8E',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginTop: 10
  },
  inputDatePicker: {
    marginTop: 10
  }
});

const SetupRow = ({label, ...props}) => (
  <View style={styles.rowContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    {props.children}
  </View>
);

export default class SetupView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      birth_date: '',
      birth_time: '',
      birth_city: '',
      is_processing: false
    }

    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.showCityConfirmation = this.showCityConfirmation.bind(this);
    this.onCityValidated = this.onCityValidated.bind(this);

    if (props.onComplete) {
      this.onComplete = props.onComplete.bind(this);
    }
  };

  onSubmitClick() {
    if (this.state.birth_city.length < 4) {
      Alert.alert("Where's that?", "Birth city can't be less than three characters");
      return;
    }

    this.setState({is_processing: true});
    new Api().geolocate(this.state.birth_city)
      .then((json) => {
        this.setState({parsed_birth_city: json});
        this.showCityConfirmation();
      })
      .catch((error) => {
        console.error(error);
        this.setState({is_processing: false});
      });
  }

  showCityConfirmation() {
    Alert.alert("Just to confirm", "You were born in: " + this.state.parsed_birth_city.location + "?",
      [
        {text: "That's not right", style: 'cancel', onPress: () => { this.setState(is_processing: false, parsed_birth_city: null) }},
        {text: "Yep", onPress: () => { this.onCityValidated() }}
      ]
    );
  }

  onCityValidated() {
    let birth_date = moment(this.state.birth_date);
    let birth_time = moment(this.state.birth_time);

    new Api().chart(this.state.name, birth_date, birth_time, this.state.parsed_birth_city)
      .then((json) => {
        this.setState({is_processing: false});
        AsyncStorage.setItem('@NatalCharts:loggedInUser', JSON.stringify(json))
          .then(() => {
            if (this.onComplete)
              this.onComplete();
          })
          .catch((error) => {
            this.setState({is_processing: false});
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        this.setState({is_processing: false});
      })
  }

  render() {
    let allFieldsHaveContents = this.state.name && this.state.birth_date && this.state.birth_time && this.state.birth_city;
    return (
      <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>Hi there, what's your name?</Text>
        <SetupRow label='Name'>
          <TextInput style={[styles.inputField, styles.inputTextField]}
                     onChangeText={(name) => this.setState({'name': name})}
                     value={this.state.name} />
        </SetupRow>
        <SetupRow label='Birth day'>
          <DatePicker style={[styles.inputField, styles.inputDatePicker]}
                      mode="date"
                      format="MMMM Do YYYY"
                      date={this.state.birth_date}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      onDateChange={(strDate, date) => this.setState({'birth_date': date})} />
        </SetupRow>
        <SetupRow label='Birth time'>
          <DatePicker style={[styles.inputField, styles.inputDatePicker]}
                      mode="time"
                      format="h:mm a"
                      date={this.state.birth_time}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      onDateChange={(strDate, date) => this.setState({'birth_time': date})} />
        </SetupRow>
        <SetupRow label='Birth city'>
          <TextInput style={[styles.inputField, styles.inputTextField]}
                     onChangeText={(text) => this.setState({'birth_city': text})}
                     value={this.state.birth_city} />
        </SetupRow>
        <Button
          onPress={this.onSubmitClick}
          title="Start the journey"
          disabled={this.state.is_processing || !allFieldsHaveContents} />
      </View>
      </ScrollView>
    );
  }
}