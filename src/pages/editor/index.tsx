import { Editor } from "@bytemd/react";
import { useState } from "react";
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

import "juejin-markdown-themes/dist/channing-cyan";
import "bytemd/dist/index.min.css";
import "highlight.js/styles/vs.css";
import "katex/dist/katex.css";

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
  const [value, setValue] = useState("");

  return (
    <Editor
      value={value}
      plugins={plugins}
      locale={zhHans}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
};
