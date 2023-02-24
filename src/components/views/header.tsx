import { useToggleHeaderStyle } from "@/hooks";
import { tagList } from "@/pages/home";
import { resetTheme } from "@/utils";
import { useRef, useState } from "react";
import { SearchV2 } from "../actions/search";
import { Tags } from "../actions/tag";
// import { Navigation } from "./navigation";
export const Header = () => {
  const headerEl = useRef<HTMLDivElement | null>(null);
  const nav2 = useRef<HTMLDivElement | null>(null);
  const avatarEl = useRef<HTMLImageElement | null>(null);
  const userInfoEl = useRef<HTMLDivElement | null>(null);
  useToggleHeaderStyle(
    [headerEl, nav2, avatarEl, userInfoEl],
    [
      { down: "-translate-y-14", up: "translate-z-0" },
      { down: "h-14", up: "h-28", media: 768 },
      { down: "avatar-md", up: "avatar-lg" },
      { down: "hidden", up: "", media: 768 },
    ]
  );
  const avatar =
    "https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
  const username = "Yomiya";
  const describe = "这个人很懒什么都没有写";
  const followers = 666;
  const followings = 12;
  const post = 10;
  const [dropDownShow, setDropDownShow] = useState<boolean>(false);
  const onSearch = (val: string) => {};
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition duration-300 "
      ref={headerEl}
    >
      {/* 导航一 小屏隐藏*/}
      <div className=" bg-base-300 md-hidden">
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
      <div className="bg-base-100 shadow-md ">
        <div
          className="container-lg transition-all duration-300  flex flex-col h-28"
          ref={nav2}
        >
          {/* 个人信息+搜索栏 */}
          <div className="h-14 md:h-full flex-between">
            {/* 左侧用户信息 */}
            <div className="left">
              <div className="flex">
                {/* 头像 */}
                <div className="mr-5 flex items-center justify-center relative">
                  <img
                    ref={avatarEl}
                    src={avatar}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropDownShow((current) => !current);
                      const close = (event: any) => {
                        // if()
                        console.log(event);
                        setDropDownShow(false);
                        document.removeEventListener("click", close);
                      };
                      document.removeEventListener("click", close);

                      document.addEventListener("click", close);
                    }}
                    alt="avatar"
                    className="rounded-lg avatar-lg transition-all duration-300"
                  />
                  {/* 用户操作区 */}
                  <ul
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={`absolute w-60 left-0 -bottom-4 translate-y-full p-5 w- border rounded-md cursor-pointer hover:shadow-lg bg-base-100 z-30 ${
                      dropDownShow ? "" : "hidden"
                    }`}
                  >
                    <li className="border-t h-12 flex items-center justify-between text-xs text-gray-400   ">
                      <span className="hover:text-primary">个人设置</span>
                      <span className="hover:text-primary">注销</span>
                    </li>
                  </ul>
                </div>
                {/* 大屏展示用户信息 */}
                <div className="md-hidden" ref={userInfoEl}>
                  <div className="mb-1 font-semibold">{username}</div>
                  <div className=" text-sm text-gray-400 mb-1">{describe}</div>
                  <ul className="flex items-center text-sm">
                    <li className="mr-2">关注: {followings}</li>
                    <li className="mr-2">粉丝: {followers}</li>
                    <li>发布数: {post}</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 小屏显示搜索框 */}
            <div className="md:hidden flex-1 flex justify-center">
              <SearchV2 onSearch={onSearch} history={true} />
            </div>
            {/* 右侧菜单 */}
            <div className="right  w-8 h-8 bg-black ml-4 ">
              {/* <Navigation /> */}
            </div>
          </div>
          {/* 小屏显示标签栏 */}
          <div className="h-14 w-full flex items-center md:hidden">
            <Tags tags={tagList} />
          </div>
        </div>
      </div>
    </div>
  );
};
