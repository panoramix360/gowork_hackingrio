import { action, observable, computed } from "mobx";

export default class UserStore {
    @observable id = "";
    @observable idEmpresa = "";
    @observable name = "";
    @observable cpf = "";
    @observable error = null;

    saveOnStorage() {
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: this.id,
                idEmpresa: this.idEmpresa,
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
        localStorage.removeItem("user");
        this.id = "";
        this.idEmpresa = "";
        this.name = "";
        this.cpf = "";
    }

    @action
    async loadDataOnStorage() {
        const data = await JSON.parse(localStorage.getItem("user"));
        if (data) {
            this.id = data.id;
            this.idEmpresa = data.idEmpresa;
            this.name = data.name;
            this.cpf = data.cpf;
        }
    }

    @action
    async authenticate(cpf) {
        await this.clearUser();
        await UserService.authenticate(this.cpf).then(
            response => {
                this.id = response.idFuncionario;
                this.idEmpresa = response.idEmpresa;
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
