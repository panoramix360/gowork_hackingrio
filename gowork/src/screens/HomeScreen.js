import React, { Component } from "react";
import { View, Text, StyleSheet, PermissionsAndroid, TouchableHighlight } from "react-native";
import { observer, inject } from "mobx-react";
import MapView, { Marker } from 'react-native-maps';
import firebase from 'firebase';
import { mapStyle } from '../constraint';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'white',
    zIndex: 3,
    justifyContent: "center",
    flexDirection: 'column',
  },

  nameText: {
    marginLeft: 20,
    fontSize: 20
  },
  minText: {
    marginRight: 10,
    fontSize: 16,
    position: "absolute",
    top: 12,
    bottom: 0,
    right: 20
  },

  button: {
    width: 300,
    height: 40, 
    bottom: 70, 
    zIndex: 5,
    backgroundColor: '#005cb2',
    borderRadius: 10,
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },

  buttonText: {
    color: "white",
    fontSize: 15
  }

});


@inject("user", "map")
@observer
class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      position: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      error: null,
    };
  }

  requestMapPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentDidMount = () => {
    // this.requestMapPermission()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          position: position.coords,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.props.map.loadOnibusPosition()
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.nameText}>Olá, {this.props.user.name} </Text>

          <Text style={styles.minText}>Estimativa: 10 min</Text>
        </View>

        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{...this.props.map.busPosition}}
            image={require('../img/bus.png')}
            provider={MapView.PROVIDER_GOOGLE}
          />

        </MapView>

        <TouchableHighlight
          style={styles.button}
          onPress={this.onPress}
        >
          <Text style={styles.buttonText}> Check-In </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default HomeScreen;