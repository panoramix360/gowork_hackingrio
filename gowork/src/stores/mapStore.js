import MapService from '../services/mapsService';
import { action, observable, computed } from "mobx";


export default class MapStore {
    @observable busPosition = {
        latitude: 37.78825,
        longitude: -122.4324,
      };

    @action
    async loadOnibusPosition() {
        let busRef = MapService.getOnibusProsition("onibus1");
        busRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            this.busPosition.latitude =  snapshot.val().latitude;
            this.busPosition.longitude =  snapshot.val().longitude;
            
        });
    }
}