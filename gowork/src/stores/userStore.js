import { action, observable, computed } from "mobx";
import UserService from "../services/userService";
import { AsyncStorage } from "react-native";

export default class UserStore {
    @observable id = "";
    @observable empresa = "";
    @observable name = "";
    @observable cpf = "";
    @observable posicao = null;
    @observable error = null;

    saveOnStorage() {
        AsyncStorage.setItem(
            "user",
            JSON.stringify({
                id: this.id,
                empresa: this.empresa,
                name: this.name,
                cpf: this.cpf,
                posicao: this.posicao
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
        this.posicao = null;
    }

    @action
    async loadDataOnStorage() {
        const data = await JSON.parse(AsyncStorage.getItem("user"));
        if (data) {
            this.id = data.id;
            this.empresa = data.empresa;
            this.name = data.name;
            this.cpf = data.cpf;
            this.posicao = data.posicao;
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
                this.posicao = {
                    latitude: response.latitude,
                    longitude: response.longitude
                };
            },
            error => {
                this.error = error;
            }
        );
        await this.saveOnStorage();
    }
}
