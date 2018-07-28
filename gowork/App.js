import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { StackNavigator } from "react-navigation";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/SecondScreen";
import CheckinScreen from "./src/screens/CheckinScreen";
import ResultValidationScreen from "./src/screens/ResultValidationScreen";
import { Provider } from "mobx-react";
import stores from "./src/stores";

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
        Profile: { screen: ProfileScreen },
        Checkin: { screen: CheckinScreen },
        ResultValidation: { screen: ResultValidationScreen }
    },
    {
        mode: "modal",
        headerMode: "none"
    }
);

export default class App extends Component {
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
