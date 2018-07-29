import React, { Component } from "react";
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Keyboard
} from "react-native";
import { observer, inject } from "mobx-react";
import firebase from "firebase";
import { GOOGLE_API_KEY } from "../constants";

@inject("user")
@observer
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: null
        };
    }

    componentDidMount = () => {
        var config = {
            apiKey: GOOGLE_API_KEY,
            authDomain: "gowork-55018.firebaseapp.com",
            databaseURL: "https://gowork-55018.firebaseio.com",
            projectId: "gowork-55018",
            storageBucket: "gowork-55018.appspot.com",
            messagingSenderId: "613755606263"
        };
        firebase.initializeApp(config);
    };

    onPressLogin = () => {
        Keyboard.dismiss()
        this.props.navigation.navigate("Home");
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    resizeMode="contain"
                    source={require("../img/bus.png")}
                    style={[styles.image]}
                />

                <TextInput placeholder="Usuário" style={styles.input} />
                <TextInput placeholder="Senha" style={styles.input} />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPressLogin}
                >
                    <Text> Login </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: "70%"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        marginTop: 50,
        padding: 10,
        width: "60%"
    },
    image: {
        width: 160,
        height: 160
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
