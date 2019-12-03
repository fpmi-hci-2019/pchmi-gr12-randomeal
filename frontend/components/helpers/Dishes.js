import React from "react";
import {Alert, View, StyleSheet, Text, Image} from "react-native";
import SortableGrid from "react-native-sortable-gridview";
import colors from "../../config/colors";

export default class Dishes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || [],
            lockData: this.props.lockData || []
        }
    }

    render() {
        console.log(this.props.data);
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
                                Alert.alert(`On Tap ${item.name}!`);
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
                                Alert.alert(`On Tap ${item.name}!`);
                            }}
                            style={[styles.item]}
                        >
                            <Image style={styles.item}
                                   source={{uri: item.photoUrl}}/>
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