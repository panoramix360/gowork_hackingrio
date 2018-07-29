import MapService from "../services/mapsService";
import { action, observable, computed } from "mobx";

export default class MapStore {
    @observable
    busPosition = {
        latitude: 37.78825,
        longitude: -122.4324
    };

    @observable busPoints = [];
    @observable waypoints = [];
    @observable empresa = null;

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
            console.log(response.pontoOnibus);
            this.busPoints = response.pontoOnibus;
            this.waypoints = this.busPoints.map(obj => {
                return `${obj.latitude},${obj.longitude}`;
            });

            this.waypoints = this.waypoints.slice(0, 10);
            //this.empresa = response.empresa;
        });
    }
}
