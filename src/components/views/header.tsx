import { resetTheme } from "@/utils";
export const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className=" bg-base-300">
        <div className="container-lg h-14 flex-between ">
          <div className="left text-white">首页/聊天室/图片/</div>
          <div className="right">
            <button
              className=" py-1 px-2 bg-primary rounded text-neutral"
              onClick={() => {
                resetTheme("m-dark");
              }}
            >
              夜间模式
            </button>
            <button
              className=" py-1 px-2 bg-secondary rounded text-neutral ml-3"
              onClick={() => {
                resetTheme("m-light");
              }}
            >
              白天模式
            </button>
          </div>
        </div>
      </div>
      <div className="bg-base-100 shadow-md">
        <div className="container-lg h-28  flex-between ">
          <div className="left">
            <span className="font-black text-xl">
              BLOCKSY <span className=" text-blue-500 font-medium"> NEWS</span>
            </span>
          </div>
          <div className="right  md-hidden ">
            信息通知/收藏/历史记录/创作中心/操作/登入
          </div>
        </div>
      </div>
    </div>
  );
};
