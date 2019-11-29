import React from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, PickerIOS, DatePickerIOS, TouchableOpacity, Platform } from "react-native";
import {Divider} from 'react-native-elements';
import colors from '../../config/colors';
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsTextInput from '../common/SettingsTextInput';

export default class UserSettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
      <Ionicons
        name={'ios-settings'}
        size={25}
        color={tintColor}
      />
    )
  };

  genderMatch = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  };

  constructor(props) {
    super(props);
    this.state = {
      gender: 3,
    };
  }

  getStateClone() {
    const stateClone = {};
    Object.keys(this.state).forEach(key => {
      stateClone[key] = this.state[key];
    });
    return stateClone;
  }

  updateState(field, value) {
    const newState = this.getStateClone();
    newState[field] = value;
    this.setState(newState);
  }

  updateUsername = (text) => {
    this.updateState('username', text);
  };

  updatePassword = (text) => {
    this.updateState('password', text);
  };

  updateWeight = (text) => {
    this.updateState('weight', parseFloat(text));
  };

  updateHeight = (text) => {
    this.updateState('height', parseFloat(text));
  };

  updatePhysicalActivity = (text) => {
    this.updateState('physicalActivity', text);
  };

  updateTargetWeight = (text) => {
    this.updateState('targetWeight', parseFloat(text));
  };

  updateGender = (value) => {
    this.updateState('gender', value);
  };

  updateBirthdate = (value) => {
    this.updateState('birthdate', value);
  };

  genderSelection = () => {
    this.updateState('showGenderSelection', !this.state.showGenderSelection);
  };

  birthdateSelection = () => {
    if (!this.state.showBirthdateSelection && !this.state.birthdate) {
      const newState = this.getStateClone();
      newState['showBirthdateSelection'] = true;
      newState['birthdate'] = new Date();
      this.setState(newState);
    } else {
      this.updateState('showBirthdateSelection', !this.state.showBirthdateSelection);
    }
  };

  render() {
    // TODO: Add animation for pickers.
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.container]}>
          <SettingsTextInput hintText="Username"
                             placeholder="Not set"
                             text={this.state.username}
                             textUpdate={this.updateUsername}/>
          <SettingsTextInput hintText="Password"
                             placeholder="Password"
                             secureTextEntry={true}
                             text={this.state.password}
                             textUpdate={this.updatePassword}/>

          <Divider style={styles.divider}/>

          <TouchableOpacity onPress={this.genderSelection}>
            <View style={styles.inputWrap}>
              <View style={styles.hintTextWrapper}>
                <Text style={styles.textHint}>Gender</Text>
                <Text style={styles.textValue}>
                  {this.genderMatch[this.state.gender]}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {!!this.state.showGenderSelection && Platform.OS === 'ios' &&
            <PickerIOS selectedValue={this.state.gender}
                       onValueChange={this.updateGender}>
              <PickerIOS.Item value={1} label='Male'/>
              <PickerIOS.Item value={2} label='Female'/>
              <PickerIOS.Item value={3} label='Other'/>
            </PickerIOS>
          }
          {!!this.state.showGenderSelection && Platform.OS === 'android' &&
            <Text>PickerIOS doesn't work for Android</Text>
          }

          <TouchableOpacity onPress={this.birthdateSelection}>
            <View style={styles.inputWrap}>
              <View style={styles.hintTextWrapper}>
                <Text style={styles.textHint}>Birthdate</Text>
                <Text style={styles.textValue}>
                  {this.state.birthdate ? this.state.birthdate.toDateString() : 'Not set'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {!!this.state.showBirthdateSelection && Platform.OS === 'ios' &&
            <DatePickerIOS date={this.state.birthdate}
                           mode='date'
                           onDateChange={this.updateBirthdate}/>
          }
          {!!this.state.showBirthdateSelection && Platform.OS === 'android' &&
            <Text>DatePickerIOS doesn't work for Android</Text>
          }

          <SettingsTextInput hintText="Weight"
                             placeholder="Current weight"
                             keyboardType="decimal-pad"
                             text={this.state.weight}
                             suffixText={this.state.weight ? 'kg' : undefined}
                             textUpdate={this.updateWeight}/>
          <SettingsTextInput hintText="Height"
                             placeholder="Current height"
                             keyboardType="decimal-pad"
                             text={this.state.height}
                             suffixText={this.state.height ? 'cm' : undefined}
                             textUpdate={this.updateHeight}/>
          <SettingsTextInput hintText="Physical activity"
                             placeholder="Physical activity"
                             text={this.state.physicalActivity}
                             textUpdate={this.updatePhysicalActivity}/>
          <SettingsTextInput hintText="Target weight"
                             placeholder="Target weight"
                             keyboardType="decimal-pad"
                             text={this.state.targetWeight}
                             suffixText={this.state.targetWeight ? 'kg' : undefined}
                             textUpdate={this.updateTargetWeight}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    backgroundColor: colors.screenBackgroundColor,
    paddingTop: 30,
    justifyContent: "flex-start"
  },
  divider: {
    height: 30,
    backgroundColor: colors.screenBackgroundColor
  },



  inputWrap: {
    flexDirection: 'row',
  },
  hintTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    height: 40
  },
  textHint: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 20,
    textAlign: 'left'
  },
  textValue: {
    flex: 1,
    color: colors.textColorGray,
    paddingRight: 10,
    fontSize: 20,
    textAlign: 'right',
  }
});
