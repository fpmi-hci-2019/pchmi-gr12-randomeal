import React from "react";
import {Alert, Image, StyleSheet, View} from "react-native";
import SortableGrid from "react-native-sortable-gridview";
import plus_image from "../../assets/plus.jpg";
import {ApiService} from "../../models/ApiService";
import ActionSheet from "react-native-actionsheet";

export default class Dishes extends React.Component {

    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.state = {
            data: this.props.data || [],
            lockData: this.props.lockData || [],
            navigation: this.props.nav || null
        };
        this.optionArray = [
            'View recipe',
            'Add to favourites',
            'Delete',
            'Cancel'
        ];
    }

    showActionSheet = (item) => {
        this.ActionSheet.show(item);
    };

    render() {
        return (
            <SortableGrid
                data={this.state.data}
                lockData={this.state.lockData}
                onDragStart={() => {
                    console.log('Default onDragStart');
                }}
                onDragRelease={(data) => {
                    console.log('Default onDragRelease', data);
                }}
                renderItem={(item, index) => {
                    return (
                        <View
                            uniqueKey={item.id}
                            onTap={() => {
                                this.showActionSheet(item)
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
                            <ActionSheet
                                ref={o => (this.ActionSheet = o)}
                                options={this.optionArray}
                                cancelButtonIndex={3}
                                destructiveButtonIndex={2}
                                onPress={ind => {
                                    switch (ind) {
                                        case 0:
                                            this.state.navigation.navigate("Recipe",
                                                {
                                                    dishId: item.id
                                                });
                                            break;
                                        case 1:
                                            console.log(item.id);
                                            //this.apiService.setBoardIsFavourite()
                                            break;
                                        case 2:
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
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                            />
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
        width: 80,
        height: 80,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 0.1,
        borderColor: "white"
    }
});