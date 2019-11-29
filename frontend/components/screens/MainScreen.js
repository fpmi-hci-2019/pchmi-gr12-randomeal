import React from "react";
import {View, StyleSheet, Text} from "react-native";

import colors from '../../config/colors';
import dimensions from '../../config/dimensions';
import fontSizes from '../../config/fontSizes';
import Ionicons from "react-native-vector-icons/Ionicons";
import {ApiService} from "../../models/ApiService";

export default class MainScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => (
            <Ionicons
                name={'ios-albums'}
                size={dimensions.SMALL_ICON_SIZE}
                color={tintColor}
            />
        )
    };

    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.state = {
          userId: this.props.navigation.dangerouslyGetParent().getParam('userId'),
          /*boards: this.apiService.get()*/
        }
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text style={styles.text}>userId: {this.state.userId}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        backgroundColor: colors.screenBackgroundColor
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});