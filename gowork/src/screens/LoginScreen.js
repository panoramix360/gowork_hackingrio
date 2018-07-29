import React, { Component } from "react";
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard
} from "react-native";
import { observer, inject } from "mobx-react";

@inject("user")
@observer
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cpf: ""
        };
    }

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

    onChangeCpf = partialCpf => {
        this.setState({ cpf: partialCpf });
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
                    onChangeText={this.onChangeCpf}
                    keyboardType="numeric"
                    value={this.state.cpf}
                />

                <TextInput
                    placeholder="Senha"
                    secureTextEntry={true}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPressLogin}
                >
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: "70%",
        fontSize: 18
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        marginTop: 50,
        padding: 10,
        width: "60%"
    },
    buttonText: {
        fontSize: 18
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
