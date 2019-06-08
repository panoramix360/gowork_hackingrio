import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PermissionsAndroid,
    TouchableOpacity,
    ListView,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'firebase';
import { mapStyle } from '../constraint';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../constants';
import Modal from 'react-native-modalbox';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        bottom: 0
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: 'white',
        zIndex: 3,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    nameText: {
        fontSize: 20
    },
    minText: {
        marginRight: 10,
        fontSize: 16,
        position: 'absolute',
        top: 12,
        bottom: 0,
        right: 20
    },

    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400'
    },
    bottomCard: {
        flex: 1,
        bottom: 30,
        backgroundColor: 'white',
        elevation: 10,
        padding: 6,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 8
    },
    cardTitle: {
        position: 'absolute',
        top: 12,
        fontSize: 16
    },
    cardTimeEstimated: {
        fontSize: 48,
        color: '#54BC90'
    },
    cardTimeDetail: {
        fontSize: 22,
        marginBottom: 6
    },
    cardTimeText: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 6,
        fontWeight: 'bold'
    },
    qrCodeLogo: {
        width: 30,
        height: 30
    }
});

@inject('user', 'map')
@observer
class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            latitude: -22.912257,
            longitude: -43.191235,
            position: {
                latitude: -22.912257,
                longitude: -43.191235
            },
            estimatedTime: '0-0',
            error: null
        };

        this.props.map.busPoints = [];
        this.props.map.waypoints = [];
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Go Work precisa de sua permissão',
                    message:
                        'Go Work precisa de acesso a sua câmera ' +
                        'para que você possa validar sua entrada.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.props.navigation.push('Checkin');
            } else {
                alert('Camera permission denied');
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
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            } else {
                console.log('Camera permission denied');
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

    onPressModalClose = () => {
        this.refs.modal1.close();
    };

    onReady = result => {
        let estimatedTime = Math.round(result.duration);
        this.setState({
            estimatedTime: `${estimatedTime - 2}-${estimatedTime}`
        });
    };

    onPressBusPosition = () => {
        this.refs.modal1.open();
    };

    onRenderRow = rowData => {
        return (
            <Text
                style={{
                    fontSize: 18
                }}
            >
                {rowData.nome}
            </Text>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.nameText}>
                        Hi, {this.props.user.name}{' '}
                    </Text>
                    <TouchableOpacity onPress={this.onPress}>
                        <Image
                            style={styles.qrCodeLogo}
                            source={require('../img/qricon.png')}
                        />
                    </TouchableOpacity>
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
                    {/* {this.props.map.busPoints.map((obj, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: obj.latitude,
                                    longitude: obj.longitude
                                }}
                                image={require('../img/pin.png')}
                                provider={MapView.PROVIDER_GOOGLE}
                            />
                        );
                    })} */}
                    {/* BUS PIN  */}
                    <Marker
                        coordinate={{ ...this.props.map.busPosition }}
                        image={require('../img/bus.png')}
                        provider={MapView.PROVIDER_GOOGLE}
                        onPress={this.onPressBusPosition}
                    />

                    {/* USER PIN */}
                    <Marker
                        coordinate={{
                            latitude: -22.906228,
                            longitude: -43.175287
                        }}
                        image={require('../img/userPin.png')}
                        provider={MapView.PROVIDER_GOOGLE}
                    />

                    {/* <MapViewDirections
                        origin={{ latitude: -22.912267, longitude: -43.191235 }}
                        destination={
                            this.props.map.waypoints[
                                this.props.map.waypoints.length - 1
                            ]
                        }
                        waypoints={toJS(this.props.map.waypoints)}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={4}
                        strokeColor='#000'
                    />

                    <MapViewDirections
                        origin={{ latitude: -22.912267, longitude: -43.191235 }}
                        destination={{
                            latitude: -22.912257,
                            longitude: -43.191235
                            // latitude: this.props.user.posicao.latitude,
                            // longitude: this.props.user.posicao.longitude
                        }}
                        strokeColor='transparent'
                        apikey={GOOGLE_API_KEY}
                        onReady={this.onReady}
                    /> */}
                </MapView>

                <View style={{ flex: 3 }} />

                <Animatable.View
                    animation='slideInUp'
                    style={styles.bottomCard}
                    useNativeDriver={true}
                >
                    <Text style={styles.cardTitle}>Estimated Time:</Text>

                    <View style={styles.cardTimeText}>
                        <Text style={styles.cardTimeEstimated}>
                            {this.state.estimatedTime}
                        </Text>
                        <Text style={styles.cardTimeDetail}>min</Text>
                    </View>
                </Animatable.View>

                <Modal
                    style={[styles.modal]}
                    ref={'modal1'}
                    swipeToClose={false}
                    coverScreen={true}
                >
                    <Text style={styles.modalTitle}>Passageiros</Text>

                    <ListView
                        dataSource={this.ds.cloneWithRows(
                            toJS(this.props.map.funcionarios)
                        )}
                        renderRow={this.onRenderRow}
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressModalClose}
                    >
                        <Text style={styles.buttonText}> Fechar </Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

export default HomeScreen;
