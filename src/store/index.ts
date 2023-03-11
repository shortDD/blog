import LoginStore from "./login";

class Store {
  loginStore;
  constructor() {
    this.loginStore = new LoginStore();
  }
}
const store = new Store();
export default store;
