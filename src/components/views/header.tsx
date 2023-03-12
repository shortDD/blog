import { meApi } from "@/api";
import { useToggleHeaderStyle } from "@/hooks";
import { useLogin } from "@/hooks/useLogin";
import { tagList } from "@/pages/home";
import { resetTheme } from "@/utils";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { SearchV2 } from "../actions/search";
import { Tags } from "../actions/tag";
import { Avatar } from "../avatar";
import { Dropdown } from "../dropdown";
import { LoginCard } from "../login-card";
import { Popconfirm } from "../popconfirm";
import { PopLogin } from "../poplogin";
// import { Navigation } from "./navigation";

// 左侧用户信息组件
const UserCard = () => {
  const avatarEl = useRef<HTMLImageElement | null>(null);
  const userInfoEl = useRef<HTMLDivElement | null>(null);
  useToggleHeaderStyle(
    [avatarEl, userInfoEl],
    [
      { down: "w-10", up: "w-16" },
      { down: "hidden", up: "", media: 768 },
    ]
  );
  const { logout } = useLogin();
  const { isLoading, data } = useQuery(["me"], meApi);
  return (
    <div className="flex ">
      {/* 头像 */}
      <Dropdown
        mode="hover"
        list={[
          {
            label: (
              <Popconfirm
                title="确认退出登入"
                description="You've been selected for a chance to get one year of subscription to use Wikipedia for free!"
                onConfirm={logout}
                htmlFor="log-out"
              >
                <span className="hover:text-primary">注销1</span>
              </Popconfirm>
            ),
          },
        ]}
      >
        <Avatar url={data?.avatar} ref={avatarEl} />
      </Dropdown>
      {/* 大屏展示用户信息 */}
      <div className="md-hidden ml-3" ref={userInfoEl}>
        <div className="mb-1 font-semibold">{data?.username}</div>
        <div className=" text-sm text-gray-400 mb-1">
          {data?.bio ? data.bio : "这个人很懒什么都没有写"}
        </div>
        <ul className="flex items-center text-sm">
          <li className="mr-2">关注: {data?.totalFollowings}</li>
          <li className="mr-2">粉丝: {data?.totalFollowers}</li>
          <li>发布数: {data?.posts}</li>
        </ul>
      </div>
    </div>
  );
};

export const Header = () => {
  const headerEl = useRef<HTMLDivElement | null>(null);
  const nav2 = useRef<HTMLDivElement | null>(null);
  useToggleHeaderStyle(
    [headerEl, nav2],
    [
      { down: "-translate-y-14", up: "translate-z-0" },
      { down: "h-14", up: "h-28", media: 768 },
    ]
  );
  const { isLogin } = useLogin();

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
              className=" py-1 px-2 bg-green-400 rounded "
              onClick={() => {
                resetTheme("m-dark");
              }}
            >
              夜间模式
            </button>
            <button
              className=" py-1 px-2 bg-sky-500 rounded  ml-3"
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
              {/* 鉴权 */}
              {isLogin ? (
                <UserCard />
              ) : (
                <PopLogin element={<LoginCard />} htmlFor="log-in">
                  <span>登入</span>
                </PopLogin>
              )}
            </div>
            {/* 小屏显示搜索框 */}
            <div className="md:hidden flex-1 flex justify-center">
              <SearchV2 onSearch={onSearch} history={true} />
            </div>
            {/* 右侧菜单 */}
            <Dropdown dir="bottom" end={true} list={[{ label: <a>item 1</a> }]}>
              下拉菜单
            </Dropdown>
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
