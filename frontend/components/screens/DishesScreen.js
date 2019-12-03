import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from '../../config/colors';

export default class DishesScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text style={styles.text}>Dishes screen</Text>
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
        marginLeft: 15
    }
});