import { Editor, Viewer } from "@bytemd/react";
import { useCallback, useState } from "react";
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
import { createApi, PostData, updateApi } from "@/api/create";
import { useNavigate, useParams } from "react-router-dom";
import { isNull } from "@/utils";
import { debounce } from "@/utils/debounce";
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
export const EditorPage = () => {
  const param = useParams();
  const naviage = useNavigate();
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const { mutate: create, isLoading: createLoading } = useMutation(createApi, {
    onSuccess: function (data: any) {
      naviage(`/editor/${data.blogId}`);
    },
  });
  const { mutate: update, isLoading: updateLoading } = useMutation(updateApi);
  if (param) {
    // 请求数据
  }
  const changeEevent = useCallback(
    debounce(() => {
      if (updateLoading || createLoading) return;
      if (isNull(param)) {
        console.log(param.id);
        console.log(title, html);
        update({
          blogId: Number(param.id),
          data: {
            title,
            html,
          },
        });
      } else {
        create({ title, html });
      }
    }, 500),
    []
  );

  return (
    <div className=" h-screen">
      <div className="h-16 flex items-center">
        <input
          value={title}
          placeholder=" 请输入标题...."
          className="h-full  px-4 flex-1 outline-none"
          onChange={(v) => {
            console.log("onCHange");
            changeEevent();
            setTitle(v.target.value);
          }}
        />
        <div className="flex items-center px-4">
          <div className="text-sm text-gray-300 mr-4">文章会自动保存</div>
          <input
            type="submit"
            className="inline-block rounded-md bg-primary py-2 px-4 text-white hover:opacity-80 transition duration-200 cursor-pointer"
          />
        </div>
      </div>
      <Editor
        value={html}
        uploadImages={async (files: any) => {
          // const baseUrl = (await readFile(files[0])) as string;
          return [
            {
              url: "https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
              alt: "",
              title: "xxx",
            },
          ];
        }}
        plugins={plugins}
        locale={zhHans}
        onChange={(v) => {
          changeEevent();

          setHtml(v);
        }}
      />
    </div>
  );
};
