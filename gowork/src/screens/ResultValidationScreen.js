import React, { Component } from "react";
import * as Animatable from "react-native-animatable";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { observer, inject } from "mobx-react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    checkIcon: {
        flex: 2,
        alignItems: "center"
    },
    image: {
        width: 150
    },
    textView: {
        flex: 1,
        alignItems: "center"
    },
    text: {
        fontSize: 24,
        fontWeight: "bold"
    },
    button: {
        width: 300,
        height: 40,
        bottom: 70,
        zIndex: 5,
        backgroundColor: "#005cb2",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 15
    }
});

@inject("user")
@observer
class ResultValidationScreen extends Component {
    onPressBack = () => {
        this.props.navigation.navigate("Home");
    };

    render() {
        return (
            <View style={styles.container}>
                <Animatable.View
                    animation="slideInDown"
                    style={styles.checkIcon}
                >
                    <Image
                        source={require("../img/checkIcon.png")}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </Animatable.View>
                <Animatable.View animation="fadeIn" style={styles.textView}>
                    <Text style={styles.text}>
                        Validação efetuada com sucesso!
                    </Text>
                    <Text style={styles.text}>Boa viagem!</Text>
                </Animatable.View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPressBack}
                >
                    <Text style={styles.buttonText}> Voltar </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ResultValidationScreen;
