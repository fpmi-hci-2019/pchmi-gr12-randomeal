import React from "react";
import {Container, Header, Content, Card, CardItem, Text, Body, Left, Right} from "native-base"
import {StyleSheet, TouchableOpacity} from "react-native";
import colors from "../../config/colors";
import dimensions from "../../config/dimensions";
import fontSizes from "../../config/fontSizes";
import {human, systemWeights} from 'react-native-typography'
import Icon from 'react-native-vector-icons/AntDesign'

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "",
            body: this.props.body || <Text>No data</Text>,
            isFav: false
        }
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Left>
                                <Text style={styles.lightTitle}>{this.state.name}</Text>
                            </Left>
                            <Right style={styles.container}>
                                <TouchableOpacity style={{width: 26}} onPress={() => {
                                    console.log(this.state.isFav);
                                    if (this.state.isFav === true)
                                        this.setState({
                                            isFav: false
                                        });
                                    else
                                        this.setState({
                                            isFav: true
                                        });
                                }}>
                                    <Icon
                                        name={this.state.isFav === true ? 'heart' : 'hearto'}
                                        size={dimensions.SMALL_ICON_SIZE - 5}
                                        color={colors.primaryColor}
                                    />
                                </TouchableOpacity>
                                <Icon
                                    style={{marginLeft: 10}}
                                    name={'close'}
                                    size={dimensions.SMALL_ICON_SIZE - 5}
                                    color={colors.loginIconColor}
                                />
                            </Right>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                {this.state.body}
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        //alignItems: 'stretch',
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontSize: fontSizes.titleSize,
        color: colors.loginIconColor,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 15
    },
    lightTitle: {
        ...human.title3,
        ...systemWeights.semibold,
        color: colors.loginIconColor,
        textAlign: 'center',
        marginLeft: 15
    }
});