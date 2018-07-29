import { action, observable, computed } from "mobx";
import UserService from "../services/userService";
import { AsyncStorage } from "react-native";

export default class UserStore {
    @observable id = "";
    @observable empresa = "";
    @observable name = "";
    @observable cpf = "";
    @observable error = null;

    saveOnStorage() {
        AsyncStorage.setItem(
            "user",
            JSON.stringify({
                id: this.id,
                empresa: this.empresa,
                name: this.name,
                cpf: this.cpf
            })
        );
    }

    @computed
    get isAuthenticated() {
        return this.id !== "";
    }

    @action
    clearUser() {
        AsyncStorage.removeItem("user");
        this.id = "";
        this.empresa = "";
        this.name = "";
        this.cpf = "";
    }

    @action
    async loadDataOnStorage() {
        const data = await JSON.parse(AsyncStorage.getItem("user"));
        if (data) {
            this.id = data.id;
            this.empresa = data.empresa;
            this.name = data.name;
            this.cpf = data.cpf;
        }
    }

    @action
    async authenticate(cpf) {
        await this.clearUser();
        await UserService.authenticate(cpf).then(
            response => {
                this.id = response.idFuncionario;
                this.empresa = response.empresa;
                this.name = response.nome;
                this.cpf = response.cpf;
            },
            error => {
                this.error = error;
            }
        );
        await this.saveOnStorage();
    }
}
