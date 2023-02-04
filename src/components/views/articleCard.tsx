import { isNull } from "@/utils";

interface ArticleCardProps {
  title: string;
  cover?: string;
  avatar: string;
  content: string;
  articleId: number;
  username: string;
}
export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  cover = "",
  avatar,
  content,
  articleId,
  username,
}) => {
  const hasCover = isNull(cover);
  return (
    <div className=" w-full rounded-md hover:shadow-lg mb-3 relative flex pb-10 bg-base-100">
      <div className=" flex p-4 w-full  flex-row">
        <div
          className={`article-info overflow-hidden ${
            hasCover ? "flex-3 " : ""
          } `}
        >
          {/*用户信息*/}
          <div className="mb-2 flex-between">
            <div className="flex items-center">
              <img
                src={avatar}
                className="w-8 h-8 mr-2 rounded-lg"
                alt="username"
              />
              <span className=" font-semibold font-mono text-lg">
                {username}
              </span>
            </div>
            <div>+</div>
          </div>
          {/*文章信息*/}
          <h1 className="font-black text-2xl mb-2 ">{title}</h1>
          <div className=" text-gray-500  font-thin font-mono overflow-hidden ">
            <p className="ellipsis">{content}</p>
          </div>
        </div>
        {/*封面*/}
        {hasCover && (
          <div className=" ml-4 flex-2 xs-hidden">
            <img
              alt=""
              className="object-cover h-full w-full shadow-md"
              src={cover}
            />
          </div>
        )}
      </div>

      {/*底部*/}
      <div className="flex-between border-t footer h-10 rounded-b-md absolute bottom-0  px-4">
        <ul className=" list-none flex items-center">
          <li className="mr-2">
            <span>5w</span>
          </li>
          <li className="mr-2">
            <span>999</span>
          </li>
          <li>
            <span>98</span>
          </li>
        </ul>
        <div className="">...</div>
      </div>
    </div>
  );
};
