import React from "react";
import {
    Text, TextInput, View, Alert,
    KeyboardAvoidingView, StyleSheet, ImageBackground, TouchableOpacity
} from "react-native";

import colors from '../../config/colors';
import dimensions from '../../config/dimensions';
import fontSizes from '../../config/fontSizes';
import login_background from '../../assets/login-background.png'
import Icon from 'react-native-vector-icons/Ionicons'
import {ApiService} from './../../models/ApiService';

export default class LoginScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Start'
        }
    };

    _login = () => {
        const email = this.state.email;
        const password = this.state.password;
        /*this.apiService.login(email, password)
            .then((response) => {
                console.log(response);
                if (response.error)
                    Alert.alert("Invalid credentials!", "Your email or password is invalid.");
                else
                    this.props.navigation.navigate("Main", {
                        userId: response.id
                    });
            })
            .catch((error) => {
                Alert.alert("Error", "Unexpected error!");
            });*/
        this.props.navigation.navigate("Start", {}, {
            type: "Navigate",
            routeName: "MainTabs",
            action: {
                type: "Navigate",
                routeName: "Main",
                params: {
                    userId: 1
                }
            }
        });
    };

    focusTheField = (id) => {
        this.inputs[id].focus();
    };

    constructor(props) {
        super(props);
        console.log(this.props.navigation);
        this.apiService = new ApiService();
        this.focusTheField = this.focusTheField.bind(this);
        this.inputs = {};
        this.state = {
            showPassword: true,
            isPressed: false,
            email: "",
            password: ""
        };
    }

    showPassword = () => {
        if (this.state.isPressed === false)
            this.setState({showPassword: false, isPressed: true})
        else
            this.setState({showPassword: true, isPressed: false})
    };

    cardClick(boxId) {
        this.props.navigation.navigate("Main",
            {
                userId: boxId
            });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.backgroundContainer}>
                <ImageBackground source={login_background} style={styles.backgroundContainer}>
                    <View style={styles.controlsContainer}>
                        <View style={styles.inputContainer}>
                            <Icon
                                name={'ios-person'}
                                size={dimensions.DEFAULT_ICON_SIZE}
                                color={colors.loginIconColor}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                ref="email"
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    this.focusTheField('password');
                                }}
                                onChangeText={(text) => this.setState({
                                    email: text
                                })}
                                placeholder={'Email'}
                                placeholderTextColor={colors.placeHolderColor}
                                underLineColorAndroid='transparent'
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name={'ios-lock'}
                                  size={dimensions.DEFAULT_ICON_SIZE}
                                  color={colors.loginIconColor}
                                  style={styles.inputIcon}/>

                            <TextInput
                                style={styles.input}
                                placeholder={'Password'}
                                returnKeyType={'done'}
                                ref={input => {
                                    this.inputs['password'] = input
                                }}
                                onChangeText={(text) => this.setState({
                                    password: text
                                })}
                                onSubmitEditing={this._login}
                                secureTextEntry={this.state.showPassword}
                                placeholderTextColor={colors.placeHolderColor}
                                underLineColorAndroid='transparent'
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={this.showPassword.bind(this)}>
                                <Icon name={this.state.showPassword === true ? 'ios-eye' : 'ios-eye-off'}
                                      size={dimensions.SMALL_ICON_SIZE}
                                      color={colors.loginIconColor}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.text} onPress={() => this.cardClick(1)}> Login </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
            ;
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controlsContainer: {
        marginBottom: 20,
        paddingTop: dimensions.WINDOW_WIDTH - 50
    },
    input: {
        width: dimensions.WINDOW_WIDTH - 55,
        height: 45,
        borderRadius: dimensions.BORDER_RADIUS,
        borderWidth: 1,
        fontSize: fontSizes.bodySmallSize,
        paddingLeft: 45,
        borderColor: colors.inputBoxColor,
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 35
    },
    inputContainer: {
        marginTop: 10
    },
    eyeIcon: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    loginBtn: {
        width: dimensions.WINDOW_WIDTH - 55,
        height: 45,
        borderRadius: dimensions.BORDER_RADIUS,
        backgroundColor: colors.btnBackgroundColor,
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: colors.shadowColor,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 7
    },
    text: {
        color: colors.btnTextColor,
        fontSize: fontSizes.bodySize,
        textAlign: 'center'
    }
});
