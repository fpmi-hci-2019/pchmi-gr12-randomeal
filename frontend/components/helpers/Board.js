import React from "react";
import {Body, Card, CardItem, Left, Right, Text} from "native-base"
import {Alert, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import dimensions from "../../config/dimensions";
import colors from "../../config/colors";
import {ApiService} from "../../models/ApiService";
import fontSizes from "../../config/fontSizes";
import {human, systemWeights} from "react-native-typography/src";

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.state = {
            name: this.props.name || "",
            body: this.props.body || <Text>No data</Text>,
            isFav: this.props.isFav,
            id: this.props.id,
        }
    }

    deleteBoard = (id) => {
        console.log('Del' + id);
        this.apiService.deleteBoard(id)
            .then((response) => {
                console.log('Delete board: ' + JSON.stringify(response));
                if (response === undefined || response.error) {
                    Alert.alert("Error", "Unexpected error.");
                } else {
                    Alert.alert('Success!', "Your board is deleted.");
                }
            })
            .catch((error) => {
                Alert.alert("Error", error);
            });
    };

    render() {
        return (
                <Card>
                    <CardItem header bordered style={{borderColor: colors.lightGreyColor, borderStyle: 'solid', borderBottomWidth: 1}}>
                        <Left>
                            <Text style={styles.boardTitle}>{this.state.name}</Text>
                        </Left>
                        <Right style={styles.container}>
                            <TouchableOpacity style={{width: dimensions.SMALL_ICON_SIZE}} onPress={() => {
                                console.log(this.state.isFav);
                                this.apiService.setBoardIsFavourite(this.state.id)
                                    .then(() => {
                                        this.apiService.getBoardIsFavourite(this.state.id)
                                            .then((response) => {
                                                console.log(response);
                                                if (response === undefined || response.error)
                                                    Alert.alert("Cannot add/delete!", "Add/delete from fav failed.");
                                                else
                                                    this.setState({
                                                        isFav: response
                                                    });
                                            })
                                            .catch((error) => {
                                                Alert.alert("Error", error);
                                            })
                                    })
                                    .catch((error) => {
                                        Alert.alert("Error", error);
                                    });
                            }}>
                                <Icon
                                    name={this.state.isFav === true ? 'heart' : 'hearto'}
                                    size={dimensions.SMALL_ICON_SIZE - 5}
                                    color={colors.primaryColor}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: dimensions.SMALL_ICON_SIZE}} onPress={() => {
                                Alert.alert(
                                    'Delete',
                                    'Do you want to delete ' + this.state.name + "?",
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        {text: 'Yes', onPress: () => this.deleteBoard(this.state.id)},
                                    ],
                                    {cancelable: false},
                                );
                            }}>
                                <Icon
                                    style={{marginLeft: 10}}
                                    name={'close'}
                                    size={dimensions.SMALL_ICON_SIZE - 5}
                                    color={colors.darkIconColor}
                                />
                            </TouchableOpacity>
                        </Right>
                    </CardItem>
                    <CardItem bordered >
                        <Body>
                            {this.state.body}
                        </Body>
                    </CardItem>
                </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontSize: fontSizes.titleSize,
        color: colors.textColor,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 15
    },
    boardTitle: {
        ...human.title3,
        ...systemWeights.semibold,
        color: colors.textColor,
        textAlign: 'center',
        marginLeft: 15
    }
});