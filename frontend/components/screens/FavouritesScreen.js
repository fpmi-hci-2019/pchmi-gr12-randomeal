import React from "react";
import {View, StyleSheet, Text, ImageBackground, TouchableOpacity, FlatList, Alert} from "react-native";
import colors from '../../config/colors';
import dimensions from '../../config/dimensions';
import Ionicons from "react-native-vector-icons/Ionicons";
import empty_back from "../../assets/smile-1.png";
import {human, systemWeights} from 'react-native-typography'
import Board from "../helpers/Board";
import Dishes from "../helpers/Dishes";
import {ApiService} from "../../models/ApiService";

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
        console.log("Fav userId " + this.userId);
        this.state = {
            boards: [{dishes: [{id: 1, name: 'box1', backgroundColor: '#09f', color: '#fff'}]}]
        };
    }

    getBoards = (userId) => {
        this.apiService.getAllFavBoardsForUser(userId)
            .then((response) => {
                console.log("Received fav boards: " + JSON.stringify(response));
                if (response.error) {
                    Alert.alert("Error.", response.error);
                    this.setState({
                        boards: []
                    });
                } else
                    this.setState({
                        boards: response
                    });
            });
    };

    renderBoards() {
        if (this.state.boards.length === 0) {
            return <ImageBackground style={styles.backgroundContainer} source={empty_back}>
                <View style={styles.controlsContainer}>
                    <Text style={styles.lightTitle}>EMPTY LIST :(</Text>
                </View>
            </ImageBackground>
        } else {
            return <View style={styles.container}>
                <FlatList
                    style={{marginTop: -dimensions.WINDOW_HEIGHT / 10}}
                    data={this.state.boards}
                    renderItem={
                        ({item}) => <Board name="TestBoard" body={<Dishes data={item.dishes}/>}/>
                    }
                    keyExtractor={(item, index) => item.toString()}
                    /*onRefresh={() => this.renderRefreshControl()}
                    refreshing={this.state.isLoading}*/
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
        justifyContent: "flex-start",
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
        paddingTop: dimensions.WINDOW_WIDTH - 50
    },
    lightTitle: {
        ...human.title1,
        ...systemWeights.semibold,
        color: colors.activeBackColor,
        marginLeft: 15,
        marginTop: 20
    }
});