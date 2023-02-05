export const Navigation = () => {
  return (
    <div className="">
      <ul className="flex items-center">
        {/* 创作中心 */}
        <li className="mr-2 font-mono  font-bold cursor-pointer hover:text-primary ">
          创作中心
        </li>
        {/* 消息提示 */}
        <li className="mr-2 font-mono  font-bold cursor-pointer hover:text-primary ">
          消息提示
        </li>
        {/* 个人中心 */}
        <li className="mr-2 font-mono  font-bold cursor-pointer hover:text-primary ">
          个人中心
        </li>
        {/* 登入退出 */}
        <li className=" font-mono  font-bold cursor-pointer hover:text-primary ">
          登入/退出
        </li>
      </ul>
    </div>
  );
};
