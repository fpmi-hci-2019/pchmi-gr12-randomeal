import React from "react";
import {View, StyleSheet, Text, Alert} from "react-native";
import colors from '../../config/colors';
import Image from "react-native-web/src/exports/Image";
import {ApiService} from "../../models/ApiService";
import {PacmanIndicator} from "react-native-indicators";

export default class DishDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.state = {
            loading: true,
            dish: {}
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('dishId'));
        //this.props.navigation.addListener('didFocus', this.onScreenFocus);
    }

    onScreenFocus = () => {
        this.setState({
            loading: true
        });
        this.apiService.getDishById(this.props.navigation.getParam('dishId'))
            .then((response) => {
                console.log("Received dish: " + JSON.stringify(response));
                if (response === undefined || response.error) {
                    Alert.alert("Error", "Unexpected error.");
                    this.setState({
                        loading: false
                    })
                } else
                    this.setState({
                        dish: response,
                        loading: false
                    });
            })
            .catch((error) => {
                Alert.alert("Error", error);
            });
    };

    render() {
        if (this.state.loading) {
            return <PacmanIndicator color={colors.primaryColor} animating={this.state.loading}/>;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Dish details screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: 'stretch',
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