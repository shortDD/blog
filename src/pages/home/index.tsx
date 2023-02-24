import { ArticleCard } from "@/components/views/articleCard";
import { Header } from "@/components/views/header";
import { SearchV2 } from "@/components/actions/search";
import { Tags, TagType } from "@/components/actions/tag";
import { useToggleHeaderStyle } from "@/hooks";
import { useRef } from "react";
const articleData = [
  {
    articleId: 1,
    authorId: 1,
    title: "浅谈前端天花板",
    content:
      "前言省流：最终拿到了58、UMU、便利蜂、虾皮、快手、腾讯、字节的offer。金三银四面试的, 这次整体面试通过率还挺高的, 面试前没有太多准备,基本上是面试过程中不断复盘, 整理面试遇到的问题",
    cover:
      "https://s3-us-west-1.amazonaws.com/bestfolis/3rvqj_N7RB9JymbUq5K5KNmp-thumb.jpeg",

    avatar:
      "https://img2.baidu.com/it/u=3088070715,2077282667&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1675616400&t=9e08e0ab82f869671a48d6efea28bd06",
    username: "lily",
  },
  {
    articleId: 2,
    authorId: 2,
    title: "浅谈前端天花板",
    content:
      "前言省流：最终拿到了58、UMU、便利蜂、虾皮、快手、腾讯、字节的offer。金三银四面试的, 这次整体面试通过率还挺高的, 面试前没有太多准备,基本上是面试过程中不断复盘, 整理面试遇到的问题",
    cover:
      "https://s3-us-west-1.amazonaws.com/bestfolis/AC2WjQQSMoBLk-0rQN04B1AL-mobilethumb.jpeg",

    avatar:
      "https://img2.baidu.com/it/u=3088070715,2077282667&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1675616400&t=9e08e0ab82f869671a48d6efea28bd06",
    username: "lily",
  },
  {
    articleId: 3,
    authorId: 3,
    title: "浅谈前端天花板",
    content:
      "前言省流：最终拿到了58、UMU、便利蜂、虾皮、快手、腾讯、字节的offer。金三银四面试的, 这次整体面试通过率还挺高的, 面试前没有太多准备,基本上是面试过程中不断复盘, 整理面试遇到的问题",
    cover:
      "https://miro.medium.com/v2/resize:fit:828/format:webp/1*H-DR5nEqi2z6jOLaYlCaNQ.jpeg",

    avatar:
      "https://img2.baidu.com/it/u=3088070715,2077282667&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1675616400&t=9e08e0ab82f869671a48d6efea28bd06",
    username: "lily",
  },
  {
    articleId: 4,
    authorId: 4,
    title: "浅谈前端天花板",
    content:
      "前言省流：最终拿到了58、UMU、便利蜂、虾皮、快手、腾讯、字节的offer。金三银四面试的, 这次整体面试通过率还挺高的, 面试前没有太多准备,基本上是面试过程中不断复盘, 整理面试遇到的问题",
    // cover:
    //   "https://s3-us-west-1.amazonaws.com/bestfolis/S7zpyqET680KF5JiQAwfTFg7-thumb.jpeg",

    avatar:
      "https://img2.baidu.com/it/u=3088070715,2077282667&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1675616400&t=9e08e0ab82f869671a48d6efea28bd06",
    username: "lily",
  },
  {
    articleId: 5,
    authorId: 5,
    title: "浅谈前端天花板",
    content:
      "前言省流：最终拿到了58、UMU、便利蜂、虾皮、快手、腾讯、字节的offer。金三银四面试的, 这次整体面试通过率还挺高的, 面试前没有太多准备,基本上是面试过程中不断复盘, 整理面试遇到的问题",
    // cover:
    //   "https://s3-us-west-1.amazonaws.com/bestfolis/S7zpyqET680KF5JiQAwfTFg7-thumb.jpeg",

    avatar:
      "https://img2.baidu.com/it/u=3088070715,2077282667&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1675616400&t=9e08e0ab82f869671a48d6efea28bd06",
    username: "lily",
  },
  {
    articleId: 6,
    authorId: 6,
    title: "浅谈前端天花板",
    content:
      "前言省流：最终拿到了58、UMU、便利蜂、虾皮、快手、腾讯、字节的offer。金三银四面试的, 这次整体面试通过率还挺高的, 面试前没有太多准备,基本上是面试过程中不断复盘, 整理面试遇到的问题",
    // cover:
    //   "https://s3-us-west-1.amazonaws.com/bestfolis/S7zpyqET680KF5JiQAwfTFg7-thumb.jpeg",

    avatar:
      "https://img2.baidu.com/it/u=3088070715,2077282667&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1675616400&t=9e08e0ab82f869671a48d6efea28bd06",
    username: "lily",
  },
  {
    articleId: 7,
    authorId: 7,
    title: "浅谈前端天花板",
    content:
      "前言省流：最终拿到了58、UMU、便利蜂、虾皮、快手、腾讯、字节的offer。金三银四面试的, 这次整体面试通过率还挺高的, 面试前没有太多准备,基本上是面试过程中不断复盘, 整理面试遇到的问题",
    // cover:
    //   "https://s3-us-west-1.amazonaws.com/bestfolis/S7zpyqET680KF5JiQAwfTFg7-thumb.jpeg",

    avatar:
      "https://img2.baidu.com/it/u=3088070715,2077282667&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1675616400&t=9e08e0ab82f869671a48d6efea28bd06",
    username: "lily",
  },
];
export const tagList: TagType[] = [
  { tagname: "React" },
  { tagname: "Vue" },
  { tagname: "Vue2" },
  { tagname: "Vue3" },
  { tagname: "前端" },
  { tagname: "后端" },
  { tagname: "uniapp" },
  { tagname: "React Native" },
];
export const HomePage = () => {
  const asideEl = useRef<HTMLDivElement | null>(null);
  useToggleHeaderStyle(
    [asideEl],
    [{ down: "top-20", up: "top-48", media: 768 }]
  );
  return (
    <div>
      <Header />
      {/*切换主题颜色*/}
      <main className=" bg-base-200 pt-48 max-md:pt-32 " id="main">
        <div className="container-lg flex ">
          {/* 文章列表 */}
          <div className="flex-1">
            {articleData.map((article) => (
              <ArticleCard
                key={article.articleId}
                title={article.title}
                avatar={article.avatar}
                content={article.content}
                cover={article.cover}
                articleId={article.articleId}
                username={article.username}
                authorId={article.authorId}
              />
            ))}
          </div>
          {/* 动态隐藏 */}
          <div className=" w-76 ml-3 md-hidden ">
            <div
              className="w-76 fixed  top-48 transition-all duration-300"
              ref={asideEl}
            >
              <div className=" h-72 bg-base-100 p-4">
                {/* 搜索功能 */}
                <div className="mb-4">
                  <SearchV2 onSearch={() => {}} history={true} />
                </div>
                {/* 标签功能 */}
                <Tags tags={tagList} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
