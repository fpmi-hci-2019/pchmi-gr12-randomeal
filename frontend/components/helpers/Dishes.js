import React from "react";
import {Alert, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import SortableGrid from "react-native-sortable-gridview";
import plus_image from "../../assets/plus.jpg";
import {ApiService} from "../../models/ApiService";
import dimensions from "../../config/dimensions";
import colors from "../../config/colors";
import Icon from "react-native-vector-icons/AntDesign";

export default class Dishes extends React.Component {

    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.state = {
            data: this.props.data || [],
            lockData: this.props.lockData || [],
            navigation: this.props.nav || null
        };
    }

    deleteDishFromBoard = (item, index) => {
        let data = [...this.state.data];
        data.splice(index, 1);
        this.setState({
            data,
        });
        console.log('Del' + item.id + item.name);
        this.apiService.deleteDishFromBoard(this.state.navigation.getParam('boardId'), item.id)
            .then((response) => {
                console.log('Delete dish from the board: ' + JSON.stringify(response));
                if (response === undefined || response.error) {
                    Alert.alert("Error", "Unexpected error.");
                } else {
                    Alert.alert('Success!', item.name + " is deleted from your board");
                }
            })
            .catch((error) => {
                Alert.alert("Error", error);
            });
    };

    render() {
        return (
            <SortableGrid
                data={this.state.data}
                lockData={this.state.lockData}
                itemCoverStyle={{marginTop: -8, marginLeft: -8}}
                renderItemCover={(item, index) => {
                    return (
                        <TouchableOpacity
                            style={{width: dimensions.SMALL_ICON_SIZE}}
                            onPress={() => {
                                Alert.alert(
                                    'Delete',
                                    'Do you want to delete ' + item.name + "?",
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        {text: 'Yes', onPress: () => this.deleteDishFromBoard(item, index)},
                                    ],
                                    {cancelable: false},
                                );
                            }}
                        >
                            <Icon
                                name={'closecircle'}
                                size={dimensions.SMALL_ICON_SIZE - 3}
                                color={colors.placeHolderColor}
                            />
                        </TouchableOpacity>
                    )
                }}
                renderItem={(item, index) => {
                    return (
                        <View
                            uniqueKey={item.id}
                            onTap={() => {
                                this.state.navigation.navigate("Recipe",
                                    {
                                        dishId: item.id
                                    });
                            }}
                            style={styles.item}
                        >
                            <Image style={styles.item}
                                   source={{uri: item.photoUrl}}/>
                        </View>
                    )
                }}
                renderLockItem={(item, index) => {
                    return (
                        <View
                            uniqueKey={item.id}
                            onTap={() => {
                                if (item.id === -1) {
                                    this.state.navigation.navigate("Dishes",
                                        {
                                            dishId: item.id,
                                            boardId: this.state.navigation.getParam('boardId')
                                        });
                                }
                            }}
                            style={[styles.item]}
                        >
                            <Image style={styles.item}
                                   source={(item.id === -1) ? plus_image : {uri: item.photoUrl}}/>
                        </View>
                    )
                }}
            />
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
        flexDirection: 'column'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 15
    },
    item: {
        width: 90,
        height: 90,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 0.1,
        borderColor: "white"
    }
});