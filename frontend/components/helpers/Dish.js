import React from "react";
import {Image, StyleSheet} from 'react-native';
import {Body, Card, CardItem, Container, Content, Header, Left, Right, Text} from 'native-base';
import dimensions from "../../config/dimensions";
import colors from "../../config/colors";
import {human, systemWeights} from "react-native-typography/src";

export default class Dish extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source || "https://cdn.pixabay.com/photo/2015/05/31/13/59/salad-791891_1280.jpg",
            title: this.props.title || "No name"
        }
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image
                                source={{uri: this.state.source}}
                                style={{
                                    height: dimensions.WINDOW_HEIGHT - (dimensions.WINDOW_HEIGHT / 2),
                                    width: null,
                                    flex: 2
                                }}/>
                        </CardItem>
                        <CardItem>
                            <Left/>
                            <Body>
                                <Text style={styles.dishTitle}>{this.state.title}</Text>
                            </Body>
                            <Right/>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    dishTitle: {
        ...human.title3,
        ...systemWeights.semibold,
        color: colors.textColor,
        textAlign: 'center',
    }
});
