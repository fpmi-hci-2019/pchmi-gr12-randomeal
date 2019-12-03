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
            boards: [
                {
                    dishes: [
                        {
                            id: 1,
                            name: 'box1',
                            backgroundColor: '#09f',
                            color: '#fff',
                            photoUrl: 'https://cdn.pixabay.com/photo/2018/03/29/12/19/oats-3272113_1280.jpg'
                        },
                        {
                            id: 2,
                            name: 'box2',
                            backgroundColor: '#09f',
                            color: '#fff',
                            photoUrl: 'https://cdn.pixabay.com/photo/2016/10/14/18/21/tee-1740871_1280.jpg'
                        },
                        {
                            id: 3,
                            name: 'box3',
                            backgroundColor: '#09f',
                            color: '#fff',
                            photoUrl: 'https://cdn.pixabay.com/photo/2016/11/17/22/53/biscuit-1832917_1280.jpg'
                        },
                        {
                            id: 4,
                            name: 'box4',
                            backgroundColor: '#09f',
                            color: '#fff',
                            photoUrl: 'https://cdn.pixabay.com/photo/2015/05/31/13/59/salad-791891_1280.jpg'
                        },
                        {
                            id: 5,
                            name: 'box5',
                            backgroundColor: '#09f',
                            color: '#fff',
                            photoUrl: 'https://cdn.pixabay.com/photo/2016/11/01/11/37/soup-1787997_1280.jpg'
                        },
                        {
                            id: 6,
                            name: 'box6',
                            backgroundColor: '#09f',
                            color: '#fff',
                            photoUrl: 'https://cdn.pixabay.com/photo/2016/08/23/15/52/fresh-orange-juice-1614822_1280.jpg'
                        }]
                },
            ],
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
                </View>
            </ImageBackground>
        } else {
            return <View style={styles.listContainer}>
                <FlatList
                    scrollEnabled={false}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    controlsContainer: {
        marginBottom: 20,
        paddingTop: dimensions.WINDOW_HEIGHT / 4
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