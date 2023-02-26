import { LoginData } from "@/api/login";
import { useState } from "react";

export const LoginPage = () => {
  const [flag, setFlag] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="h-screen relative  bg-base-200">
      <div className="h-full absolute right-0 top-0 w-1/2 flex items-center justify-center">
        <div className=" bg-base-100 max-w-lg w-full rounded-lg py-12 px-8">
          <h1 className=" text-neutral font-bold pb-12  text-3xl text-center border-b-2 border-b-base-200 tracking-widest">
            登录
          </h1>
          <form
            className={`py-8 ${flag ? "" : "hidden"}`}
            onSubmit={(e) => {
              e.preventDefault();
              const loginData: LoginData = {
                username,
                password,
              };
              console.log(loginData);
            }}
          >
            <div className=" h-16 bg-base-200 flex items-center justify-center px-4 rounded-md mb-8">
              <input
                className=" w-full outline-none bg-base-200 transition-all duration-200 text-secondary text-sm font-semibold "
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className=" h-16 bg-base-200 flex items-center justify-center px-4 rounded-md mb-8">
              <input
                className=" w-full outline-none bg-base-200 transition-all duration-200 text-secondary text-sm font-semibold "
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <input
              className="transition-all duration-200 cursor-pointer bg-neutral h-16 w-full rounded-md text-white"
              type="submit"
              value="登入"
            />
          </form>
          <div className="flex items-center justify-between">
            <span className=" cursor-pointer hover:text-neutral">
              忘记密码?
            </span>
            <span
              className="cursor-pointer hover:text-neutral"
              onClick={() => {
                setFlag(false);
              }}
            >
              注册
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
