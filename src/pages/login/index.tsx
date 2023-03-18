import { loginApi, LoginData } from "@/api/login";
import { useMutation } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useStore from "@/store";
export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginStore } = useStore();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<LoginData>({ mode: "onChange" });
  const { mutate, isLoading } = useMutation(
    (loginData: LoginData) => loginApi(loginData),
    {
      onSuccess: (data: any) => {
        if (data.ok) {
          loginStore.setToken(data.token);
          // navigate("/");
        } else {
          setLoginError(data.error);
        }
      },
    }
  );
  const onSubmit: SubmitHandler<LoginData> = () => {
    if (isLoading) return;
    const { username, password } = getValues();
    mutate({ username, password });
  };

  return (
    <div className="h-screen relative  bg-base-200">
      <div className=" absolute bg-base-100 max-w-sm w-full rounded-lg py-12 px-8 md:right-36 top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 -translate-y-1/2">
        <h1 className=" text-neutral font-bold pb-12  text-3xl text-center border-b-2 border-b-base-200 tracking-widest">
          登录
        </h1>
        <form className="py-6" onSubmit={handleSubmit(onSubmit)}>
          <div className=" h-12 bg-base-200 flex items-center justify-center px-4 rounded-md mb-3">
            <input
              className=" leading-10  w-full outline-none bg-base-200 transition-all duration-200  text-md font-semibold "
              type="text"
              placeholder="username"
              {...register("username", { required: true })}
            />
          </div>
          {errors.username && (
            <div className=" text-center mb-3">
              <span className=" text-red-500 text-sm">密码不能为空</span>
            </div>
          )}
          <div className=" h-12 bg-base-200 flex items-center justify-center px-4 rounded-md mb-3">
            <input
              className=" leading-6  w-full outline-none bg-base-200 transition-all duration-200  text-md font-semibold "
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && (
            <div className=" text-center mb-3">
              <span className=" text-red-500 text-sm">密码不能为空</span>
            </div>
          )}
          <input
            className="transition-all duration-200 cursor-pointer bg-neutral h-12 w-full rounded-md text-white"
            type="submit"
            value="登入"
            disabled={!isValid}
          />
          {loginError && (
            <div className=" text-center mb-3">
              <span className=" text-red-500 text-sm">{loginError}</span>
            </div>
          )}
        </form>
        <div className="flex items-center justify-between">
          <span className=" cursor-pointer hover:text-neutral">忘记密码?</span>
          <span className="cursor-pointer hover:text-neutral">注册</span>
        </div>
      </div>
    </div>
  );
};
