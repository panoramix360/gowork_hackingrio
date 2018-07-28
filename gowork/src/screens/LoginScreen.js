import React, { Component } from "react";
import { Image, View, Text, TextInput, TouchableHighlight, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";
import firebase from 'firebase';


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
  }
  
  onPressLogin = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
            resizeMode="contain"
            source={require('../img/bus.png')}
            style={[styles.image]}
        />

        <TextInput placeholder='Usuário' style={styles.input} />
        <TextInput placeholder='Senha' style={styles.input} />
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
    width: '70%'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginTop: 50,
    padding: 10,
    width: '60%'
  },
  image: {
    width: 250,
    height: 250
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});