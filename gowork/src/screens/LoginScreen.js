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
            cpf: "12963071744"
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

    onPressLogin = async () => {
        Keyboard.dismiss();
        if (this.state.cpf != null && this.state.cpf != "") {
            await this.props.user.authenticate(this.state.cpf);
            if (this.props.user.id != null && this.props.user.id != "") {
                this.props.navigation.navigate("Home");
            } else {
                alert("Usuário não encontrado.");
            }
        } else {
            alert("Preencha o CPF!");
        }
    };

    onChangeCpf = e => {
        this.setState({ cpf: e.target.value });
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    resizeMode="contain"
                    source={require("../img/bus.png")}
                    style={[styles.image]}
                />

                <TextInput
                    placeholder="CPF"
                    style={styles.input}
                    onChange={this.onChangeCpf}
                    keyboardType="numeric"
                    value={this.state.cpf}
                />

                <TextInput
                    placeholder="Senha"
                    secureTextEntry={true}
                    style={styles.input}
                />

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
