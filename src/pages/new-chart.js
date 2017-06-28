import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import store from 'react-native-simple-store';
import Api from '../api';

import { Header } from '../components/';

import {
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
    paddingRight: 20,
    borderBottomWidth: 1
  },
  nameInput: {
    width: '100%',
    height: 60,
    marginTop: 10,
    alignItems: 'center',
    fontSize: 32,
    color: '#ff03d2'
  },
  setupRowLabel: {
    width: '100%',
    fontSize: 32,
    color: '#FFF'
  },
  birthAtLabel: {
    fontSize: 32,
    alignSelf: 'flex-end',
    color: '#FFF'
  },
  birthInLabel: {
    fontSize: 32,
    alignSelf: 'flex-end',
    color: '#FFF',
  },
  birthdayPicker: {
    width: 180,
    height: 60,
    marginTop: 10,
    marginRight: 10,
    alignItems: 'center'
  },
  birthtimePicker: {
    width: 150,
    height: 60,
    marginTop: 10,
    marginRight: 10,
    alignItems: 'flex-start'
  },
  birthLocationInput: {
    height: 60,
    marginTop: 10,
    alignItems: 'flex-end',
    fontSize: 32,
    color: '#ff03d2',
    width: '80%'
  },
  datePicker: {
    borderWidth: 0
  },
  datePickerContainer: {
    height: 100,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 1
  },
  datePickerText: {
    fontSize: 32,
    color: '#ff03d2'
  },
  datePickerConfirmText: {
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
    fontSize: 32
  }
});

const SetupRow = ({title, ...props}) => (
  <View style={styles.rowContainer}>
    {title &&
      <Text style={styles.setupRowLabel}>{title}</Text>}
    {props.children}
  </View>
);

const SetupButton = ({text, onPress, disabled, ...props}) => (
  <TouchableOpacity style={styles.buttonWrapper} onPress={onPress} disabled={disabled}>
    <Text style={styles.submitButton}>{text}</Text>
  </TouchableOpacity>
);

export default class SetupView extends Component {
  static propTypes = {
    onComplete: React.PropTypes.func.isRequired
  };

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
        {text: "Yep", style: 'default', onPress: () => { this.onCityValidated() }},
        {text: "That's not right", style: 'cancel',
          onPress: () => { this.setState({is_processing: false, parsed_birth_city: null}) }}
      ]
    );
  }

  onCityValidated() {
    let birth_date = moment(this.state.birth_date, 'MM/DD/YYYY');
    let birth_time = moment(this.state.birth_time, 'hh:mm a');

    new Api().chart(this.state.name, birth_date, birth_time, this.state.parsed_birth_city)
      .then((json) => {
        let key = json['person']['name'];
        store.push('savedCharts', json)
          .then(() => this.props.onComplete(key));
      })
      .catch((error) => {
        console.error(error);
        this.setState({is_processing: false});
      })
  }

  onNewBirthdate(date) {
    let momentDate = moment(date, 'MM/DD/YYYY');

    this.setState({birth_date: momentDate.hour(0).minute(0).second(0).format('MM/DD/YYYY')});
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
        <Header onBackPress={() => { this.props.history.goBack() }} />
        <SetupRow title='Name'>
          <TextInput style={styles.nameInput}
                     onChangeText={(name) => this.setState({'name': name})}
                     value={this.state.name} />
        </SetupRow>
        <SetupRow title='Born on'>
          <DatePicker
            style={styles.birthdayPicker}
            date={this.state.birth_date}
            onDateChange={this.onNewBirthdate}
            minDate={minDate.format('YYYY-MM-DD')}
            maxDate={maxDate.format('YYYY-MM-DD')}
            format={"MM/DD/YYYY"}
            customStyles={{dateInput: styles.datePicker, dateText: styles.datePickerText, dateTouchBody: styles.datePickerContainer, btnTextConfirm: styles.datePickerConfirmText}}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            mode='date' />
          <Text style={styles.birthAtLabel}>at</Text>
          <DatePicker
            style={styles.birthtimePicker}
            date={this.state.birth_time}
            format={'hh:mm a'}
            customStyles={{dateInput: styles.datePicker, dateText: styles.datePickerText, dateTouchBody: styles.datePickerContainer, btnTextConfirm: styles.datePickerConfirmText}}
            onDateChange={this.onNewBirthTime}
            is24Hour={false}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            mode='time' />
          <Text style={styles.birthInLabel}>in</Text>
          <TextInput style={styles.birthLocationInput}
                     onChangeText={(text) => this.setState({'birth_city': text})}
                     value={this.state.birth_city} />
        </SetupRow>
        <View style={styles.submitWrapper}>
          <SetupButton
            text={this.state.is_processing ? "Researching..." : "Save Chart"}
            onPress={this.onSubmitClick}
            disabled={this.state.is_processing || !allFieldsHaveContents} />
        </View>
      </View>
      </ScrollView>
    );
  }
}