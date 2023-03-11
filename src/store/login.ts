import { getToken } from "@/utils";
import { makeAutoObservable } from "mobx";
type StateType = {
  token?: string;
  userInfo: any;
};
class LoginStore {
  state: StateType;
  constructor() {
    makeAutoObservable(this);
    this.state = {
      token: getToken() || "",
      userInfo: {},
    };
  }
}
export default LoginStore;
