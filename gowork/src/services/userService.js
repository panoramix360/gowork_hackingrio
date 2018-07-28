import axios from 'axios';
// import { API_URL } from '../constants/strings';

class UserService {

    authenticate(email, password) {
        // return axios.post(`${API_URL}/api/user/login`, { email, password })
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .catch((error) => {
        //         throw error;
        //     });
    }

}

export default new UserService();
