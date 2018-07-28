import { action, observable, computed } from "mobx";

export default class UserStore {
    @observable email = "teste@test.com";
    @observable userId = "";
    @observable role = "";
    @observable name = "Daniel";
    @observable password = "";
    @observable error = null;

    saveOnStorage() {
        localStorage.setItem(
            "user",
            JSON.stringify({
                email: this.email,
                userId: this.userId,
                name: this.name,
                role: this.role
            })
        );
    }

    @computed
    get isAuthenticated() {
        console.log(this.userId !== "");
        return this.userId !== "";
    }

    @action
    clearUser() {
        localStorage.removeItem("user");
        this.userId = "";
        this.name = "";
        this.role = "";
    }

    @action
    async loadDataOnStorage() {
        const data = await JSON.parse(localStorage.getItem("user"));
        if (data) {
            this.email = data.email;
            this.userId = data.userId;
            this.name = data.name;
            this.role = data.role;
        }
    }

    // @action
    // async authenticate() {
    //     await this.clearUser();
    //     await UserService.authenticate(this.email, this.password).then(
    //         response => {
    //             this.email = response.email;
    //             this.userId = response._id;
    //             this.name = response.name;
    //             this.role = response.role;
    //         },
    //         error => {
    //             this.error = error;
    //         }
    //     );
    //     await this.saveOnStorage();
    // }
}
