import { Editor } from "@bytemd/react";
import { createContext, useCallback, useEffect, useState } from "react";
import gfm from "@bytemd/plugin-gfm";
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import zhHans from "bytemd/locales/zh_Hans.json";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math-ssr";
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import mermaidLocale from "@bytemd/plugin-mermaid/locales/zh_Hans.json";
import "juejin-markdown-themes/dist/channing-cyan.min.css";
import "bytemd/dist/index.min.css";
import "highlight.js/styles/vs.css";
import "katex/dist/katex.css";
import "./index.css";

import { useMutation } from "react-query";
import { createApi, updateApi } from "@/api/create";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "@/utils/debounce";
import { seeBlogEditorApi } from "@/api/blog";
import { DropdownV1 } from "@/components/dropdown";
import { PostForm } from "./component/PostForm";
import { uploadApi } from "@/api/upload";

export const EditorData = createContext<{ html: string; title: string }>({
  html: "",
  title: "",
});
// bytemd插件
const plugins = [
  gfm({ locale: gfmLocale }),
  breaks(),
  frontmatter(),
  gemoji(),
  highlight(),
  math({ locale: mathLocale }),
  mediumZoom(),
  mermaid({ locale: mermaidLocale }),
];

export const EditorPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  // 获取blog
  const { mutate: seeBlog, data: blogData } = useMutation(seeBlogEditorApi, {
    onSuccess(data: any) {
      if (data.ok) {
        setHtml(data.blog.html);
        setTitle(data.blog.title);
      } else {
        navigate("/404");
      }
    },
  });
  // 创建草稿
  const { mutate: create, isLoading: createLoading } = useMutation(createApi, {
    onSuccess: function (data: any) {
      navigate(`/editor/${data.blogId}`);
    },
  });
  // 更新草稿
  const { mutate: update, isLoading: updateLoading } = useMutation(updateApi);
  useEffect(() => {
    if (param.id) {
      // 请求数据
      seeBlog(Number(param.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeEvent = useCallback(
    debounce((title: string, html: string) => {
      if (updateLoading || createLoading) return;
      if (param.id) {
        // 路径带参数 修改草稿
        update({
          blogId: Number(param.id),
          data: {
            title,
            html,
            status: 0,
          },
        });
      } else {
        // 不带参数 首次创建草稿 创建成功调整带参页面,进行修改草稿
        create({ title, html, status: 0 });
      }
    }, 500),
    []
  );

  return (
    <div className=" h-screen">
      <EditorData.Provider value={{ html, title }}>
        <div className="h-16 flex items-center">
          <input
            value={title}
            placeholder=" 请输入标题...."
            className="h-full  px-4 flex-1 outline-none"
            onChange={(v) => {
              changeEvent(v.target.value, html);
              setTitle(v.target.value);
            }}
          />
          <div className="flex items-center px-4">
            <div className="text-sm text-gray-300 mr-4">文章会自动保存</div>
            <DropdownV1
              component={
                <PostForm
                  defaultTags={blogData?.blog?.tags?.map(
                    (tag: any) => tag.tagname
                  )}
                  cover={blogData?.blog?.cover}
                />
              }
            >
              <input
                type="submit"
                className="inline-block rounded-md bg-primary py-2 px-4 text-white hover:opacity-80 transition duration-200 cursor-pointer"
              />
            </DropdownV1>
          </div>
        </div>
      </EditorData.Provider>

      <Editor
        value={html}
        uploadImages={async (files: File[]) => {
          // const baseUrl = (await readFile(files[0])) as string;
          const formData = new FormData();
          formData.append("file", files[0]);
          const { fileUrl } = (await uploadApi(formData)) as any;
          return [
            {
              url: fileUrl,
              alt: "",
              title: "xxx",
            },
          ];
        }}
        plugins={plugins}
        locale={zhHans}
        onChange={(v) => {
          changeEvent(title, v);
          setHtml(v);
        }}
      />
    </div>
  );
};

// const readFile = (file: any) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const base64Url = reader.result;
//         resolve(base64Url);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
