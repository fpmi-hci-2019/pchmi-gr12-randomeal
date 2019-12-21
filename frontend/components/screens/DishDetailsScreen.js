import React from "react";
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import colors from '../../config/colors';
import {ApiService} from "../../models/ApiService";
import {PacmanIndicator} from "react-native-indicators";
import dimensions from "../../config/dimensions";
import {human, systemWeights} from "react-native-typography";
import fontSizes from "../../config/fontSizes";

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
        this.props.navigation.addListener('didFocus', this.onScreenFocus);
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
                <Text style={styles.lightTitle}>                   {this.state.dish.name}</Text>
                <Image
                    source={{uri: this.state.dish.photoUrl}}
                    style={{
                        marginTop: 20,
                        height: 250,
                        width: dimensions.WINDOW_WIDTH,
                    }}/>
                <View style={{ marginLeft: 20, flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Text style={styles.infoText}>{this.state.dish.description}</Text>
                </View>
            </View>
        );
    }
}

/*<View style={styles.dishInfoContainer}>
                    <Icon
                        name={'clockcircle'}
                        size={dimensions.SMALL_ICON_SIZE}
                        color={colors.primaryColor}
                    />
                    <Text style={styles.infoText}>{this.state.dish.cookingTime}</Text>
                </View>*/

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        flex: 3,
        backgroundColor: colors.white,
        flexDirection: 'column',
        marginTop: 20
    },
    dishInfoContainer: {
        justifyContent: "space-between",
        alignItems: 'flex-start',
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'row'
    },
    lightTitle: {
        ...human.title1,
        ...systemWeights.light,
        color: colors.activeBackColor
    },
    infoText: {
        marginTop: 20,
        fontSize: fontSizes.titleSize,
        fontWeight: "normal",
        color: colors.textColor
    },
});