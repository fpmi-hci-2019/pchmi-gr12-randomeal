import React from "react";
import {Alert, Button, ImageBackground, StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";

import colors from '../../config/colors';
import dimensions from '../../config/dimensions';
import fontSizes from '../../config/fontSizes';
import {human, systemWeights} from 'react-native-typography'
import Icon from "react-native-vector-icons/Ionicons";
import {ApiService} from "../../models/ApiService";
import Board from "../helpers/Board";
import Dishes from "../helpers/Dishes";
import empty_back from "../../assets/smile-1.png";

export default class MainScreen extends React.Component {
    static navigationOptions = {
        title: 'Boards',
        titleSize: 20,
        headerRight: <TouchableOpacity
            onPress={() => alert("onPress")}>
            <Icon
                style={{marginRight: 20}}
                name={'ios-add'}
                size={dimensions.DEFAULT_ICON_SIZE}
                color={colors.primaryColor}
            />
        </TouchableOpacity>
    };


    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.userId = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('userId');
        console.log("userId" + this.userId);
        this.state = {
            boards: [],
            //[{dishes: [{id: 1, name: 'box1', backgroundColor: '#09f', color: '#fff'}]}],
            isLoading: false
        };
        //this.getBoards(this.userId);
    }

    renderRefreshControl() {
        this.state.isLoading ? this.setState({isLoading: false}) : this.setState({isLoading: true});
    }

    getBoards = (userId) => {
        this.apiService.getAllBoardsForUser(userId)
            .then((response) => {
                console.log("Received boards: " + JSON.stringify(response));
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
                    <Text style={styles.lightTitle}>CREATE BOARD</Text>
                    <TouchableOpacity
                        onPress={() => alert("onPress")}>
                        <Icon color={colors.loginIconColor} size={dimensions.SMALL_ICON_SIZE} name={'ios-add'}/>
                        <Text>Login with Facebook</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        } else {
            return <View style={styles.backgroundContainer}>
                <FlatList
                    style={{marginTop: -dimensions.WINDOW_HEIGHT / 10}}
                    data={this.state.boards}
                    renderItem={
                        ({item}) => <Board name="TestBoard" body={<Dishes data={item.dishes}/>}/>
                    }
                    keyExtractor={(item, index) => item.toString()}
                    onRefresh={() => this.renderRefreshControl()}
                    refreshing={this.state.isLoading}
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
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    controlsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    infoText: {
        fontSize: fontSizes.titleSize,
        fontWeight: "100",
        color: colors.btnBackgroundColor
    },
    lightTitle: {
        ...human.title1,
        ...systemWeights.light,
        color: colors.activeBackColor
    }
});