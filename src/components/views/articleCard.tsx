import { isNull } from "@/utils";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { CiRead } from "react-icons/ci";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useAddClass } from "@/hooks";
import { useRef } from "react";
interface ArticleCardProps {
  title: string;
  cover?: string;
  avatar: string;
  content: string;
  articleId: number;
  username: string;
  authorId: number;
  mode?: "首页" | "个人页";
}
const outlet =
  "https://img1.baidu.com/it/u=3082031234,2042696090&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=665";
export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  cover = "",
  avatar,
  content,
  articleId,
  username,
  authorId,
  mode = "首页",
}) => {
  const hasCover = isNull(cover);
  const bottomRightActions = useRef<HTMLUListElement | null>(null);
  const [toggleClass] = useAddClass(bottomRightActions, {
    default: "scale-x-0",
    replaceValue: "scale-x-100",
  });
  return (
    <div className=" w-full rounded-md hover:shadow-lg mb-3 relative flex pb-10 bg-base-100">
      <div className=" flex p-4 w-full  flex-row">
        <div
          className={`article-info overflow-hidden pr-4 ${
            hasCover ? "flex-3 " : ""
          } `}
        >
          {/*用户信息*/}
          <div className="mb-3  flex-between">
            <Link to={`/profile/${authorId}`}>
              <div className="flex items-center cursor-pointer">
                <img
                  src={avatar}
                  className="w-8 h-8 mr-2 rounded-lg"
                  alt="username"
                />
                <span className=" font-semibold font-mono text-lg">
                  {username}
                </span>
              </div>
            </Link>
            {/* 关注按键 */}
            <div>
              <div className="py-1 px-2 font-mono text-sm bg-primary cursor-pointer text-white rounded-md">
                关注
              </div>
            </div>
          </div>
          {/*文章信息*/}
          <Link to={`/article/${articleId}`}>
            <h1 className="font-black text-2xl mb-3 truncate" title={title}>
              {title}
            </h1>
            <div className=" text-gray-500  font-thin font-mono overflow-hidden ">
              <p
                className="ellipsis hover:underline tracking-widest		"
                title={content}
              >
                {content}
              </p>
            </div>
          </Link>
        </div>
        {/*封面*/}
        {hasCover && (
          <div className="flex-2 xs-hidden ratio relative">
            <img
              alt=""
              className="object-cover w-full h-full shadow-md hover:scale-110 origin-top-right duration-100 transition  hover:z-20 absolute inset-0"
              src={cover}
              onError={(e) => {
                const el = e.target as HTMLElement;
                el.onerror = null;
                el.setAttribute("src", outlet);
              }}
            />
          </div>
        )}
      </div>

      {/*底部*/}
      <div className="flex-between  footer h-10 rounded-b-md absolute bottom-0 px-4">
        <ul className=" list-none flex items-center">
          <li className="mr-1">
            <div className="flex items-center text-gray-400 cursor-pointer text-lg hover:text-gray-600">
              <CiRead />
              <span className=" ml-1 text-xs ">5w</span>
            </div>
          </li>
          <li className="mr-1">
            <div className="flex items-center text-gray-400 cursor-pointer text-lg hover:text-gray-600">
              <AiOutlineLike />
              <span className=" ml-1 text-xs ">333</span>
            </div>
          </li>
          <li>
            <div className="flex items-center text-gray-400 cursor-pointer text-lg hover:text-gray-600">
              <VscComment />
              <span className=" ml-1 text-xs ">99</span>
            </div>
          </li>
        </ul>
        <div className=" cursor-pointer relative flex items-center text-lg">
          <ul
            className="  origin-right flex items-center whitespace-nowrap  text-xs transition-all duration-300 overflow-hidden scale-x-0 "
            ref={bottomRightActions}
          >
            <li className=" hover:text-primary rounded-md py-1 px-2">
              不感兴趣
            </li>
            <li className=" hover:text-primary rounded-md  py-1 px-2">收藏</li>
          </ul>
          <HiEllipsisVertical onClick={toggleClass} />
        </div>
      </div>
    </div>
  );
};
