import React from "react";
import {Alert, View, StyleSheet, Text} from "react-native";
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
                data={this.state.data}/*{[
                    {name: 'dish1', backgroundColor: '#09f', color: '#fff'},
                    {name: 'dish2', backgroundColor: '#f60', color: '#fff'},
                    {name: 'dish3', backgroundColor: '#333', color: '#fff'},
                    {name: 'dish4', backgroundColor: '#rgba(255, 216, 58, 1)', color: '#333'},
                    {name: 'dish5', backgroundColor: '#rgba(0, 222, 144, 1)', color: '#fff'},
                ]}*/
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
                            style={[styles.item, {backgroundColor: item.backgroundColor}]}
                        >
                            <Text style={[{color: item.color}]}>{item.name}</Text>
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
                            style={[styles.item, {backgroundColor: item.backgroundColor}]}
                        >
                            <Text style={[{color: item.color}]}>{item.name}</Text>
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
        width: 50,
        height: 50
    }
});