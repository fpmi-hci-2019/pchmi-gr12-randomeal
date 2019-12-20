import React from "react";
import {Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import colors from '../../config/colors';
import dimensions from '../../config/dimensions';
import Icon from "react-native-vector-icons/Ionicons";
import {ApiService} from "../../models/ApiService";
import empty_back from "../../assets/smile-1.png";
import Board from "../helpers/Board";
import Dishes from "../helpers/Dishes";
import fontSizes from "../../config/fontSizes";
import {human, systemWeights} from "react-native-typography";
import {PacmanIndicator} from "react-native-indicators";

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
            isLoading: false,
            loading: true,
            requestIsLoading: true
        };
    }

    renderRefreshControl() {
        this.state.isLoading ? this.setState({isLoading: false}) : this.setState({isLoading: true});
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
        this.apiService.getAllBoardsForUser(userId)
            .then((response) => {
                console.log("Received boards: " + JSON.stringify(response));
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
            }).catch((error) => {
            Alert.alert("Error", error);
            this.setState({
                loading: false
            })
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
                        ({item}) => <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("BoardInfo",
                                    {
                                        boardId: item.id
                                    });
                            }}
                        >
                            <Board isFav={item.favourite} id={item.id} name="TestBoard"
                                   body={<Dishes lockData={item.dishes} nav={this.props.navigation}/>}/>
                        </TouchableOpacity>
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
        if (this.state.loading) {
            return <PacmanIndicator color={colors.primaryColor} animating={this.state.loading}/>;
        }
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