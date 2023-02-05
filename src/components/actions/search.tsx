import { IButton } from "./button";

export const SearchV1 = () => {
  const submit = () => {};
  return (
    <div className=" flex items-center mb-2">
      <input
        className=" outline-none border p-2 mr-2 flex-1 focus:border-primary transition duration-300 rounded-md"
        placeholder="请输入内容"
      />
      <IButton text="搜索" click={submit} />
    </div>
  );
};
