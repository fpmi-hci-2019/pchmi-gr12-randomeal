import React from "react";
import {Alert, FlatList, ImageBackground, StyleSheet, Text, View} from "react-native";
import colors from '../../config/colors';
import dimensions from '../../config/dimensions';
import {human, systemWeights} from 'react-native-typography'
import Ionicons from "react-native-vector-icons/Ionicons";

import sad_smile_back from "../../assets/sad-smile.png";
import Board from "../helpers/Board";
import Dishes from "../helpers/Dishes";
import {ApiService} from "../../models/ApiService";
import {PacmanIndicator} from "react-native-indicators";

export default class FavouritesScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => (
            <Ionicons
                name={'ios-heart'}
                size={dimensions.SMALL_ICON_SIZE}
                color={tintColor}
            />
        ),
        backgroundColor: colors.white
    };

    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.userId = this.props.navigation.dangerouslyGetParent().getParam('userId');
        this.state = {
            boards: [],
            loading: true
            //[{dishes: [{id: 1, name: 'box1', backgroundColor: '#09f', color: '#fff'}]}]
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus);
    }

    onScreenFocus = () => {
        this.setState({
            loading: true
        });
        this.getBoards(this.userId);
    };

    getBoards = (userId) => {
        this.apiService.getAllFavBoardsForUser(userId)
            .then((response) => {
                console.log("Received fav boards: " + JSON.stringify(response));
                if (response === undefined || response.error) {
                    Alert.alert("Error", "Unexpected error.");
                    this.setState({
                        boards: [],
                        loading: false
                    });
                } else
                    this.setState({
                        boards: response,
                        loading: false
                    });
            })
            .catch((error) => {
                Alert.alert("Error", error);
            });
    };

    renderBoards() {
        if (this.state.loading) {
            return <PacmanIndicator color={colors.primaryColor} animating={this.state.loading}/>;
        }
        if (this.state.boards.length === 0) {
            return <ImageBackground style={styles.backgroundContainer} source={sad_smile_back}>
                <View style={styles.controlsContainer}>
                    <Text style={styles.lightTitle}>EMPTY LIST :(</Text>
                </View>
            </ImageBackground>
        } else {
            return <View style={styles.container}>
                <FlatList
                    style={{marginTop: -dimensions.WINDOW_HEIGHT / 12 + 20}}
                    data={this.state.boards}
                    renderItem={
                        ({item}) => <Board id={item.id} isFav={item.favourite} name={item.name}
                                           body={<Dishes lockData={item.dishes} nav={this.props.navigation}/>}/>
                    }
                    keyExtractor={(item, index) => item.toString()}
                    initialNumToRender={8}
                />
            </View>
        }
    }

    render() {
        return (
            this.renderBoards()
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        justifyContent: "center",
        alignItems: 'center',
        width: null,
        height: null,
        flex: 1,
        backgroundColor: colors.screenBackgroundColor,
        flexDirection: 'column',
    },
    container: {
        justifyContent: "flex-start",
        alignItems: 'stretch',
        width: null,
        height: null,
        flex: 1,
        backgroundColor: colors.screenBackgroundColor,
        flexDirection: 'column',
    },
    controlsContainer: {
        marginBottom: 20,
        paddingTop: dimensions.WINDOW_HEIGHT / 4
    },
    lightTitle: {
        ...human.title1,
        ...systemWeights.light,
        color: colors.activeBackColor,
        marginLeft: 15,
        marginTop: 20
    },
    testcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});