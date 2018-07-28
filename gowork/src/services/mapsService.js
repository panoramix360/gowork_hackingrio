// import { API_URL } from '../constants/strings';
import firebase from 'firebase';


class MapService {


    getOnibusProsition = (idBus) => {
        let busRef = firebase.database().ref('onibus/' + idBus);
        return busRef;
    }

}

export default new MapService();
