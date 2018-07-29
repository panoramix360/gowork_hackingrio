import MapService from "../services/mapsService";
import { action, observable, computed } from "mobx";

export default class MapStore {
    @observable
    busPosition = {
        latitude: 37.78825,
        longitude: -122.4324
    };

    @observable busPoints = [];
    @observable funcionarios = [];
    @observable waypoints = [];

    @action
    async loadOnibusPosition() {
        let busRef = MapService.getOnibusProsition("onibus1");
        busRef.on("value", snapshot => {
            console.log(snapshot.val());
            this.busPosition.latitude = snapshot.val().latitude;
            this.busPosition.longitude = snapshot.val().longitude;
        });
    }

    @action
    loadRoutes(idFuncionario) {
        MapService.loadRoutes(idFuncionario).then(response => {
            this.busPoints = response.pontoOnibus;

            console.log(response.pontoOnibus);

            let newWaypoints = [];
            for (var i in response.pontoOnibus) {
                let waypoint = this.busPoints[i];
                this.funcionarios.push(waypoint.funcionario);
                if (newWaypoints.length == 0) {
                    newWaypoints.push(waypoint);
                } else {
                    let isAlreadyExists = false;
                    for (var j in newWaypoints) {
                        let waypointAdded = newWaypoints[j];
                        if (
                            waypoint.latitude == waypointAdded.latitude &&
                            waypoint.longitude == waypointAdded.longitude
                        ) {
                            isAlreadyExists = true;
                        }
                    }

                    if (!isAlreadyExists) {
                        newWaypoints.push(waypoint);
                    }
                }
            }

            this.waypoints = newWaypoints.map(obj => {
                return `${obj.latitude},${obj.longitude}`;
            });

            console.log(this.waypoints);
            console.log(this.funcionarios);
        });
    }
}
