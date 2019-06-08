import React, { Component } from 'react';
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    ImageBackground,
    View
} from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('user')
@observer
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cpf: '12963071744'
        };
    }

    componentDidMount = () => {
        this.props.navigation.navigate('Home');
    };

    onPressLogin = async () => {
        Keyboard.dismiss();
        if (this.state.cpf != null && this.state.cpf != '') {
            // await this.props.user.authenticate(this.state.cpf);
            // if (this.props.user.id != null && this.props.user.id != '') {
            this.props.navigation.navigate('Home');
        } else {
            alert('Preencha o CPF!');
        }
    };

    onChangeCpf = partialCpf => {
        this.setState({ cpf: partialCpf });
    };

    render() {
        return (
            <ImageBackground
                source={require('../img/background.png')}
                style={styles.container}
            >
                <Image
                    style={styles.logo}
                    source={require('../img/logo.png')}
                />

                <View style={styles.labelBox}>
                    <Text style={styles.label}>E-mail Address</Text>
                </View>

                <TextInput
                    placeholder='CPF'
                    style={styles.input}
                    onChangeText={this.onChangeCpf}
                    keyboardType='numeric'
                    value={this.state.cpf}
                    underlineColorAndroid={'white'}
                    placeholderTextColor={'white'}
                />

                <View style={styles.labelBox}>
                    <Text style={styles.label}>Password</Text>
                </View>

                <TextInput
                    placeholder='Senha'
                    secureTextEntry={true}
                    style={styles.input}
                    underlineColorAndroid={'white'}
                    placeholderTextColor={'white'}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPressLogin}
                >
                    <Text style={styles.buttonText}> SIGN UP </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: '70%',
        fontSize: 18,
        color: 'white'
    },
    logoName: {
        fontSize: 28,
        color: 'white',
        fontWeight: '600'
    },
    label: {
        fontSize: 14,
        color: '#54BC90',
        fontWeight: '600'
    },
    labelBox: {
        justifyContent: 'flex-start',
        width: '70%'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#54BC90',
        marginTop: 50,
        padding: 10,
        width: '60%'
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    image: {
        width: 160,
        height: 160
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200
    }
});
