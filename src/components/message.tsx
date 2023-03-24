import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

type MessageProsp = {
  content: string;
  onDestory: () => void;
  delay: number;
};
const Message: React.FC<MessageProsp> = ({ content, onDestory, delay }) => {
  const el = useRef<HTMLDivElement | null>(null);
  // 组件加载后 定时移除
  useEffect(() => {
    setTimeout(() => {
      el.current?.classList.replace("translate-y-full", "translate-y-0");
    }, 50);
    const t = setTimeout(() => {
      el.current?.classList.add("opacity-0");
      setTimeout(onDestory, 500);
    }, delay);
    return () => {
      el.current = null;
      t && clearTimeout(t);
    };
  }, []);
  return (
    <div
      className="p-4 rounded-lg  bg-black text-white bg-opacity-40 text-sm font-normal mb-3 translate-y-full transition-all duration-500"
      ref={el}
    >
      {content}
    </div>
  );
};
const isMsgExist = () => {
  const container = getMsgContainer();
  return Boolean(container.children.length);
};
const getMsgContainer = () => {
  let container = document.querySelector("#msg-container");
  if (!container) {
    let _container = document.createElement("div");
    _container.id = "msg-container";
    _container.style.zIndex = "9999";
    _container.className =
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
    document.body.appendChild(_container);
    return _container;
  }
  return container;
};

const _message = (type: string) => (content: string) => {
  if (isMsgExist()) {
    return;
  }
  const container = getMsgContainer();
  const msg = document.createElement("div");
  container.appendChild(msg);

  const root = ReactDOM.createRoot(msg);
  const onDestory = () => {
    container.removeChild(msg);
    root.unmount();
  };
  root.render(<Message content={content} onDestory={onDestory} delay={2000} />);
};

const info = _message("info");

export default { info, isMsgExist };
