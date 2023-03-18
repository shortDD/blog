import { createContext, useContext } from "react";
import LoginStore from "./login";

class Store {
  loginStore;
  constructor() {
    this.loginStore = new LoginStore();
  }
}
const store = new Store();
const storeContext = createContext(store);
const useStore = () => useContext(storeContext);
export default useStore;
