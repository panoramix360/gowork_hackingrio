import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { StackNavigator } from "react-navigation";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CheckinScreen from "./src/screens/CheckinScreen";
import ResultValidationScreen from "./src/screens/ResultValidationScreen";
import { Provider } from "mobx-react";
import stores from "./src/stores";
import firebase from "firebase";
import { GOOGLE_API_KEY } from "./src/constants";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#272C36"
    },
    navigator: {
        backgroundColor: "#272C36"
    }
});

const Navigator = StackNavigator(
    {
        Login: { screen: LoginScreen },
        Home: { screen: HomeScreen },
        Checkin: { screen: CheckinScreen },
        ResultValidation: { screen: ResultValidationScreen }
    },
    {
        mode: "modal",
        headerMode: "none"
    }
);

export default class App extends Component {
    componentDidMount() {
        if (!firebase.apps.length) {
            var config = {
                apiKey: GOOGLE_API_KEY,
                authDomain: "gowork-55018.firebaseapp.com",
                databaseURL: "https://gowork-55018.firebaseio.com",
                projectId: "gowork-55018",
                storageBucket: "gowork-55018.appspot.com",
                messagingSenderId: "613755606263"
            };
            firebase.initializeApp(config);
        }
    }

    render() {
        return (
            <Provider {...stores}>
                <SafeAreaView style={styles.safeArea}>
                    <Navigator style={styles.navigator} />
                </SafeAreaView>
            </Provider>
        );
    }
}
