import { getToken, isNull, removeToken, setToken } from "@/utils";
import { makeAutoObservable } from "mobx";

class LoginStore {
  state = { token: getToken() || "" };
  constructor() {
    makeAutoObservable(this);
  }
  get isLogin() {
    return isNull(this.state.token);
  }
  setToken = (token: string) => {
    setToken(token);
    document.documentElement.style.overflow = "auto";
    this.state.token = token;
  };
  logout = () => {
    this.state.token = "";
    removeToken();
  };
}
export default LoginStore;
