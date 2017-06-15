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
  TouchableOpacity,
  ScrollView,
  Platform,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#febdff',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  scrollContainer: {
    flex: 1
  },
  rowContainer: {
    margin: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: 20
  },
  inputLabel: {
    fontSize: 26,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
    color: '#FFF'
  },
  inputLabelFullWidth: {
    width: '100%',
    fontSize: 32,
    color: '#FFF'
  },
  inputFieldFullWidth: {
    width: '100%'
  },
  inputField: {
    height: 40,
    borderBottomColor: '#23346a',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    padding: 5,
    marginTop: 10,
    alignItems: 'center'
  },
  inputTextField: {
    height: 40,
    padding: 5,
    marginTop: 10,
    alignItems: 'center',
    fontSize: 26,
    color: '#ff03d2',
    width: '80%'
  },
  datePicker: {
    borderWidth: 0,
    height: 100,
    width: 200
  },
  datePickerContainer: {
    height: 100,
    width: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  datePickerText: {
    fontSize: 26,
    color: '#ff03d2'
  },
  submitWrapper: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  buttonWrapper: {
    height: 80,
    backgroundColor: '#40cbe8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButton: {
    color: '#FFF',
    margin: 10,
    fontSize: 26
  }
});

const SetupRow = ({title, ...props}) => (
  <View style={styles.rowContainer}>
    {title &&
      <Text style={styles.inputLabelFullWidth}>{title}</Text>}
    {props.children}
  </View>
);

const SetupButton = ({text, onPress, disabled, ...props}) => (
  <TouchableOpacity style={styles.buttonWrapper} onPress={onPress} disabled={disabled}>
    <Text style={styles.submitButton}>{text}</Text>
  </TouchableOpacity>
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
    let birth_date = moment(this.state.birth_date, 'MM/DD/YYYY');
    
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
    this.setState({birth_date: date});
  }
  
  onNewBirthTime(date) {
    this.setState({birth_time: date});
  }

  render() {
    let allFieldsHaveContents = this.state.name && this.state.birth_date && this.state.birth_time && this.state.birth_city;
    let maxDate = moment();
    let minDate = moment('19400101','YYYYMMDD');

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <SetupRow title='My name is'>
          <TextInput style={[styles.inputFieldFullWidth, styles.inputTextField]}
                     onChangeText={(name) => this.setState({'name': name})}
                     value={this.state.name} />
        </SetupRow>
        <SetupRow title='I was born on'>
          <DatePicker
            style={styles.inputField}
            date={this.state.birth_date}
            onDateChange={this.onNewBirthdate}
            minDate={minDate.format('YYYY-MM-DD')}
            maxDate={maxDate.format('YYYY-MM-DD')}
            format={"MM/DD/YYYY"}
            customStyles={{dateInput: styles.datePicker, dateText: styles.datePickerText, dateTouchBody: styles.datePickerContainer}}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            mode='date' />
          <Text style={styles.inputLabel}>at</Text>
          <DatePicker
            style={styles.inputField}
            date={this.state.birth_time}
            format={'HH:mm'}
            customStyles={{dateInput: styles.datePicker, dateText: styles.datePickerText, dateTouchBody: styles.datePickerContainer}}
            onDateChange={this.onNewBirthTime}
            is24Hour={false}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            mode='time' />
          <Text style={styles.inputLabel}>in</Text>
          <TextInput style={[styles.inputTextField]}
                     onChangeText={(text) => this.setState({'birth_city': text})}
                     value={this.state.birth_city} />
        </SetupRow>
        <View style={styles.submitWrapper}>
          <SetupButton
            text={this.state.is_processing ? "Taking off..." : "Let's do this"}
            onPress={this.onSubmitClick}
            disabled={this.state.is_processing || !allFieldsHaveContents} />
        </View>
      </View>
      </ScrollView>
    );
  }
}