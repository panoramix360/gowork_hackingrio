import axios from "axios";
import firebase from "firebase";
import { API_URL } from "../constants";

class MapService {
    getOnibusProsition = idBus => {
        let busRef = firebase.database().ref("onibus/" + idBus);
        return busRef;
    };

    loadRoutes = idFuncionario => {
        return axios
            .post(`${API_URL}/rota/funcionario/`, { cpf })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    };
}

export default new MapService();
