import React from "react";
import {Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import dimensions from "../../config/dimensions";
import colors from "../../config/colors";
import Dish from "../helpers/Dish";
import fontSizes from "../../config/fontSizes";
import {ApiService} from "../../models/ApiService";
import {PacmanIndicator} from "react-native-indicators";

export default class DishesScreen extends React.Component {

    addDish = () => {
        let dish = this.state.dishes[this.state.activeIndex];
        this.apiService.addDishOnBoard(this.boardId, dish.id)
            .then((response) => {
                console.log("Add dish on the board: " + JSON.stringify(response));
                if (response === undefined || response.error) {
                    Alert.alert("Error", "Unexpected error.");
                } else {
                    Alert.alert("Success!", dish.name + ' is added on your board.');
                }
            })
            .catch((error) => {
                Alert.alert("Error", error);
            });
    };

    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.boardId = this.props.navigation.getParam('boardId');
        this._renderItem = this._renderItem.bind(this);
        this.state = {
            dishes: [],
            activeIndex: 0,
            loading: true
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus);
    }

    onScreenFocus = () => {
        this.setState({
            loading: true
        });
        this.getDishes();
    };

    getDishes = () => {
        this.apiService.getAllDishes()
            .then((response) => {
                console.log("Received dishes: " + JSON.stringify(response));
                if (response === undefined || response.error) {
                    Alert.alert("Error", "Unexpected error.");
                    this.setState({
                        dishes: [],
                        loading: false
                    });
                } else
                    this.setState({
                        dishes: response,
                        loading: false
                    });
            })
            .catch((error) => {
                Alert.alert("Error", error);
            });
    };

    _renderItem({item, index}) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Recipe', {
                        dishId: item.id
                    })
                }}
            >
                <Dish title={item.name} source={item.photoUrl}/>
            </TouchableOpacity>
        )
    }

    render() {
        if (this.state.loading) {
            return <PacmanIndicator color={colors.primaryColor} animating={this.state.loading}/>;
        }
        return (
            <SafeAreaView style={styles.container}>
                <Carousel
                    slideStyle={{marginTop: 20}}
                    inactiveSlideOpacity={0.3}
                    layout={'stack'}
                    layoutCardOffset={9}
                    data={this.state.dishes}
                    sliderWidth={dimensions.WINDOW_WIDTH}
                    itemWidth={dimensions.WINDOW_WIDTH - 50}
                    itemHeight={dimensions.WINDOW_HEIGHT / 2 + 50}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({activeIndex: index})}
                />
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.btnText} onPress={() => this.addDish()}> Add on board </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        marginTop: 10
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 20,
        color: colors.placeHolderColor
    },
    loginBtn: {
        width: dimensions.WINDOW_WIDTH - 10,
        height: 45,
        marginBottom: 50,
        borderRadius: dimensions.BORDER_RADIUS,
        backgroundColor: colors.btnBackgroundColor,
        justifyContent: 'center'
    },
    btnText: {
        color: colors.btnTextColor,
        fontSize: fontSizes.bodySize,
        textAlign: 'center'
    }
});
