import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    PermissionsAndroid,
    TouchableHighlight
} from "react-native";
import * as Animatable from "react-native-animatable";
import { observer, inject } from "mobx-react";
import MapView, { Marker } from "react-native-maps";
import firebase from "firebase";
import { mapStyle } from "../constraint";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../constants";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        bottom: 0
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: "white",
        zIndex: 3,
        justifyContent: "center",
        flexDirection: "column"
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
        height: 60,
        bottom: 0,
        zIndex: 5,
        marginTop: 8,
        backgroundColor: "#005cb2",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "white",
        fontSize: 15
    },
    bottomCard: {
        flex: 1,
        bottom: 30,
        backgroundColor: "white",
        elevation: 10,
        padding: 6,
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 8
    },
    cardTitle: {
        position: "absolute",
        top: 12,
        fontSize: 16
    },
    cardTimeEstimated: {
        fontSize: 48,
        color: "#d18100"
    },
    cardTimeDetail: {
        fontSize: 22,
        marginBottom: 6
    },
    cardTimeText: {
        flexDirection: "row",
        alignItems: "flex-end"
    }
});

@inject("user", "map")
@observer
class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: -22.912257,
            longitude: -43.191235,
            position: {
                latitude: -22.912257,
                longitude: -43.191235
            },
            estimatedTime: "0-0",
            error: null
        };
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Go Work precisa de sua permissão",
                    message:
                        "Go Work precisa de acesso a sua câmera " +
                        "para que você possa validar sua entrada."
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.props.navigation.push("Checkin");
            } else {
                alert("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    requestMapPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures."
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    position: position.coords,
                    error: null
                });
            },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        this.props.map.loadOnibusPosition();
        this.props.map.loadRoutes(this.props.user.id);
    };

    onPress = () => {
        this.requestCameraPermission();
    };

    onReady = result => {
        let estimatedTime = Math.round(result.duration);
        this.setState({
            estimatedTime: `${estimatedTime - 2}-${estimatedTime}`
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.nameText}>
                        Olá, {this.props.user.name}{" "}
                    </Text>
                </View>

                <MapView
                    style={styles.map}
                    customMapStyle={mapStyle}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    {this.props.map.busPoints.map(obj => {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: obj.latitude,
                                    longitude: obj.longitude
                                }}
                                image={require("../img/pin.png")}
                                provider={MapView.PROVIDER_GOOGLE}
                            />
                        );
                    })}

                    <Marker
                        coordinate={{ ...this.props.map.busPosition }}
                        image={require("../img/bus.png")}
                        provider={MapView.PROVIDER_GOOGLE}
                    />

                    <Marker
                        coordinate={{
                            latitude: -22.906548,
                            longitude: -43.174177
                        }}
                        image={require("../img/userPin.png")}
                        provider={MapView.PROVIDER_GOOGLE}
                    />

                    <MapViewDirections
                        origin={{ ...this.props.map.busPosition }}
                        destination={{
                            latitude: -22.906548,
                            longitude: -43.174177
                        }}
                        waypoints={this.props.map.waypoints}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={4}
                        strokeColor="#000"
                    />

                    <Marker
                        coordinate={{
                            latitude: this.props.user.posicao.latitude,
                            longitude: this.props.user.posicao.longitude
                        }}
                        image={require("../img/userPin.png")}
                        provider={MapView.PROVIDER_GOOGLE}
                    />

                    <MapViewDirections
                        origin={{ ...this.props.map.busPosition }}
                        destination={{
                            latitude: this.props.user.posicao.latitude,
                            longitude: this.props.user.posicao.longitude
                        }}
                        apikey={GOOGLE_API_KEY}
                        onReady={this.onReady}
                    />
                </MapView>

                <View style={{ flex: 3 }} />

                <Animatable.View
                    animation="slideInUp"
                    style={styles.bottomCard}
                    useNativeDriver={true}
                >
                    <Text style={styles.cardTitle}>Tempo estimado:</Text>

                    <View style={styles.cardTimeText}>
                        <Text style={styles.cardTimeEstimated}>
                            {this.state.estimatedTime}
                        </Text>
                        <Text style={styles.cardTimeDetail}>minutos</Text>
                    </View>

                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.onPress}
                    >
                        <Text style={styles.buttonText}> Check-In </Text>
                    </TouchableHighlight>
                </Animatable.View>
            </View>
        );
    }
}

export default HomeScreen;
