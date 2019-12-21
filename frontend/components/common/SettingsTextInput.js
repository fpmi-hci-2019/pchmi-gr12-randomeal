import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import colors from '../../config/colors';


export default class SettingsTextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.inputWrap}>
        <View style={styles.hintTextWrapper}>
          <Text style={styles.textHint}>{this.props.hintText}</Text>
        </View>
        <TextInput style={styles.textInput}
                   placeholder={this.props.placeholder}
                   keyboardType={this.props.keyboardType || 'default'}
                   returnKeyType='done'
                   secureTextEntry={!!this.props.secureTextEntry}
                   onChangeText={(text) => this.props.textUpdate(text)}>
          {this.props.text || ''}
        </TextInput>
        {!!this.props.suffixText && 
          <View style={styles.hintTextWrapper}>
            <Text style={styles.inputSuffix}>{this.props.suffixText}</Text>
          </View>
        }
      </View>
      );
  }
} 


const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    marginBottom: 1
  },
  hintTextWrapper: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    height: 40
  },
  textHint: {
    paddingLeft: 10,
    fontSize: 20,
    textAlign: 'left'
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.white,
    color: colors.textColorGray,
    paddingRight: 10,
    fontSize: 20,
    height: 40,
    textAlign: 'right',
  },
  inputSuffix: {
    color: colors.textColorGray,
    paddingRight: 10,
    fontSize: 20
  },
});
