import { loginApi, LoginData } from "@/api/login";
import { isNull } from "@/utils";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Message from "@/components/message";
import useStore from "@/store";
export const LoginCard = () => {
  const { loginStore } = useStore();

  const submitInput = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginData>({ mode: "onSubmit" });

  const { mutate, isLoading } = useMutation(
    (loginData: LoginData) => loginApi(loginData),
    {
      onSuccess: (data: any) => {
        if (data.ok) {
          loginStore.setToken(data.token);
        } else {
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
    <div className=" pt-10 px-6 pb-4 flex">
      {/* left */}
      <div className="flex flex-col ">
        {/* title */}
        <div className=" mb-6 text-lg text-center">扫描二维码登录</div>
        <div className="  w-40 border border-black aspect-square"></div>
        {/* code */}
      </div>
      {/* line */}
      <div className="pt-7 flex-1 overflow-hidden">
        <div className=" w-0 mt-6 h-full border-l border-gray-300 mx-auto"></div>
      </div>
      {/* right*/}
      <div className="flex flex-col w-96">
        <div className="mb-6 text-lg flex items-end justify-center">
          <div>密码登入</div>
          <div className=" text-gray-300 font-thin px-4">|</div>
          <div>短信登入</div>
        </div>
        {/* form */}
        <form
          className="border border-gray-200 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* 账号 */}
          <div className="w-full h-11 py-3 px-5 flex items-center">
            <div className="text-sm">账号</div>
            <input
              className="ml-5 text-sm outline-none font-normal flex-1 bg-base-100"
              placeholder="请输入账号"
              {...register("username", { required: "请输入账号" })}
            />
          </div>
          {/* 分割线 */}
          <div className="w-full border-t border-gray-300"></div>
          {/* 密码 */}
          <div className="w-full h-11 py-3 px-5 flex items-center">
            <div className="text-sm">密码</div>
            <input
              className="ml-5 text-sm outline-none font-normal flex-1 bg-base-100"
              placeholder="请输入密码"
              type="password"
              {...register("password", { required: "请输入密码" })}
            />
          </div>
          <input type="submit" ref={submitInput} className="hidden" />
        </form>
        {/* 按键 */}
        <div className="w-full flex items-center  leading-10 text-sm text-center mt-7">
          <div className="flex-1 h-10 bg-white border border-gray-200 rounded-lg cursor-pointer">
            注册
          </div>
          <div className="w-2"></div>
          <div
            onClick={() => {
              submitInput.current?.click();
              const { username, password } = getValues();
              if (isNull(errors) || !username || !password) {
                if (!Message.isMsgExist()) {
                  let errorMsg = "请输入";
                  if (errors.username || !username) errorMsg += "账号";
                  if (errors.password || !password) errorMsg += "密码";
                  Message.info(errorMsg);
                }
              }
            }}
            className="flex-1 h-10  bg-primary text-white rounded-lg cursor-pointer "
          >
            登入
          </div>
        </div>
      </div>
    </div>
  );
};
