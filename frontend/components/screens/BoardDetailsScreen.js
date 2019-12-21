import React from "react";
import {Alert, StyleSheet, View} from "react-native";
import colors from '../../config/colors';
import Dishes from "../helpers/Dishes";
import Board from "../helpers/Board";
import {ApiService} from "../../models/ApiService";
import {PacmanIndicator} from "react-native-indicators";
import dimensions from "../../config/dimensions";

export default class BoardDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.boardId = this.props.navigation.getParam('boardId');
        this.state = {
            board: {},
            loading: true
        };
        console.log("boardId" + this.boardId);
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
        this.props.navigation.addListener('didFocus', this.onScreenFocus);
    }

    onScreenFocus = () => {
        this.setState({
            loading: true
        });
        this.apiService.getBoard(this.boardId)
            .then((response) => {
                console.log("Received board: " + JSON.stringify(response));
                if (response === undefined || response.error) {
                    Alert.alert("Error", "Unexpected error.");
                    this.setState({
                        loading: false
                    })
                } else
                    this.setState({
                        board: response,
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
        return <View style={[styles.container]}>
            <Board isFav={this.state.board.favourite} id={this.state.board.id} name={this.state.board.name}
                   body={<Dishes data={this.state.board.dishes} lockData={[{id: -1}]} nav={this.props.navigation}/>}/>
        </View>
    }

    render() {
        return (
            this.renderBoards()
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: -dimensions.WINDOW_HEIGHT / 10
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 15
    }
});