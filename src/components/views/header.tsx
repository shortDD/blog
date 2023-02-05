import { useToggleHeaderStyle } from "@/hooks";
import { resetTheme } from "@/utils";
import { useRef } from "react";
export const Header = () => {
  const headerEl = useRef<HTMLDivElement | null>(null);
  const nav2 = useRef<HTMLDivElement | null>(null);
  useToggleHeaderStyle(
    [headerEl, nav2],
    [
      { down: "-translate-y-14", up: "translate-z-0" },
      { down: "h-14", up: "h-28" },
    ]
  );
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition duration-300 "
      ref={headerEl}
    >
      {/* 导航一 */}
      <div className=" bg-base-300">
        <div className="container-lg h-14 flex-between ">
          {/* 左侧菜单 */}
          <div className="left text-white">BLOG / Chat / 图片 /</div>
          {/* 切换主题 */}
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
      {/* 导航二 */}
      <div className="bg-base-100 shadow-md">
        <div
          className="container-lg h-28  flex-between transition-all duration-300 "
          ref={nav2}
        >
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
