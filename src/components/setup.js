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
  TouchableHighlight,
  ScrollView,
  Platform,
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
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  inputTextField: {
    height: 40,
    borderColor: '#8E8E8E',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginTop: 10,
    alignItems: 'center',
    fontSize: 16
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
      birth_date: moment('19900101', 'YYYYMMDD').utc().toDate(),
      birth_time: moment().minute(0).second(0).utc().toDate(),
      birth_city: '',
      is_processing: false,
    }

    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.showCityConfirmation = this.showCityConfirmation.bind(this);
    this.onCityValidated = this.onCityValidated.bind(this);
    
    this.onNewBirthdate = this.onNewBirthdate.bind(this);
    this.onNewBirthTime = this.onNewBirthTime.bind(this);

    if (this.props.onComplete) {
      this.onComplete = props.onComplete.bind(this);
    }
  };

  onSubmitClick() {
    if (this.state.birth_city.length < 4) {
      Alert.alert("Where's that?", "Birth city can't be less than three characters");
      return;
    }

    let birth_date = moment(this.state.birth_date, 'YYYY-MM-DD');

    this.setState({is_processing: true});
    new Api().geolocate(this.state.birth_city, birth_date)
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
        {text: "That's not right", style: 'cancel',
          onPress: () => { this.setState({is_processing: false, parsed_birth_city: null}) }}, 
        {text: "Yep", onPress: () => { this.onCityValidated() }}
      ]
    );
  }

  onCityValidated() {
    let birth_date = moment(this.state.birth_date, 'YYYY-MM-DD');
    
    let birth_hour = this.state.birth_time.split(":")[0];
    let birth_min = this.state.birth_time.split(":")[1];

    new Api().chart(this.state.name, birth_date, birth_hour, birth_min, this.state.parsed_birth_city)
      .then((json) => {
        this.setState({is_processing: false});
        AsyncStorage.setItem('@NatalCharts:loggedInUser', JSON.stringify(json))
          .then(() => {
            console.log("done");
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
  
  onNewBirthdate(date) {
    console.log("new birthdate: " + date);
    
    this.setState({birth_date: date});
  }
  
  onNewBirthTime(date) {
    console.log("new birthtime: " + date);
    
    console.log(date);
    this.setState({birth_time: date});
  }

  render() {
    let allFieldsHaveContents = this.state.name && this.state.birth_date && this.state.birth_time && this.state.birth_city;
    let maxDate = moment();
    let minDate = moment('19400101','YYYYMMDD');

    return (
      <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>Hi there, what's your name?</Text>
        <SetupRow label='Name'>
          <TextInput style={[styles.inputField, styles.inputTextField]}
                     onChangeText={(name) => this.setState({'name': name})}
                     value={this.state.name} />
        </SetupRow>
        <SetupRow label='Birthday' style={styles.inputField}>
          <DatePicker
            style={styles.inputField}
            date={this.state.birth_date}
            onDateChange={this.onNewBirthdate}
            minDate={minDate.format('YYYY-MM-DD')}
            maxDate={maxDate.format('YYYY-MM-DD')}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            mode='date' />
        </SetupRow>
        <SetupRow label='Birth time'>
          <DatePicker
            style={styles.inputField}
            date={this.state.birth_time}
            format={'HH:mm'}
            onDateChange={this.onNewBirthTime}
            is24Hour={false}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            mode='time' />
        </SetupRow>
        <SetupRow label='Birth city'>
          <TextInput style={[styles.inputField, styles.inputTextField]}
                     onChangeText={(text) => this.setState({'birth_city': text})}
                     value={this.state.birth_city} />
        </SetupRow>
        <Button
          onPress={this.onSubmitClick}
          title={this.state.is_processing ? "Taking off..." : "Let's do this"}
          disabled={this.state.is_processing || !allFieldsHaveContents} />
      </View>
      </ScrollView>
    );
  }
}