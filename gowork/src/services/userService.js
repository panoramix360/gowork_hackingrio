import axios from "axios";
import { API_URL } from "../constants";

class UserService {
    authenticate(cpf) {
        return axios
            .post(`${API_URL}/funcionario/login`, { cpf })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }
}

export default new UserService();
