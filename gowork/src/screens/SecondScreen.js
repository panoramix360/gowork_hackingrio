import React, { Component } from "react";
import { View, Text } from "react-native";
import { observer, inject } from "mobx-react"; 

@inject("store")
@observer
export default class SecondScreen extends Component {

  render() {
    const { binanceApiStore, navigation } = this.props;

    return (
      <View>
        <Text> teste 2</Text>
      </View>
    );
  }

}