import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    PermissionsAndroid,
    TouchableHighlight,
    Image,
    Alert
} from "react-native";
import { observer, inject } from "mobx-react";
import Camera from "react-native-camera";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    }
});

@inject("user")
@observer
class CheckinScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isQrCodeCaptured: false
        };
    }

    onPressAfterValidation = () => {};

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    barCodeTypes={[Camera.constants.BarCodeType.qr]}
                    onBarCodeRead={(data, bounds) => {
                        if (!this.state.isQrCodeCaptured) {
                            this.setState({ isQrCodeCaptured: true });
                            Alert.alert(
                                "Sucesso",
                                "Validação feita com sucesso!",
                                [
                                    {
                                        text: "OK",
                                        onPress: this.onPressAfterValidation()
                                    }
                                ],
                                { cancelable: false }
                            );
                        }
                    }}
                >
                    <Image
                        style={{ position: "absolute", top: 0, left: 0 }}
                        source={require("../img/qrcodeTarget.png")}
                    />
                    <Image
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            transform: [{ rotate: "90deg" }]
                        }}
                        source={require("../img/qrcodeTarget.png")}
                    />
                    <Image
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            transform: [{ rotate: "270deg" }]
                        }}
                        source={require("../img/qrcodeTarget.png")}
                    />
                    <Image
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            transform: [{ rotate: "180deg" }]
                        }}
                        source={require("../img/qrcodeTarget.png")}
                    />
                </Camera>
            </View>
        );
    }
}

export default CheckinScreen;
