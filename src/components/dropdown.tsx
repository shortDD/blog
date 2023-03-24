import { useEffect, useRef, useState } from "react";

type DropdownProps = {
  dir?: "left" | "right" | "top" | "bottom";
  end?: boolean;
  one?: boolean;
  mode?: "hover" | "click";
  children: any;
  size?: "default" | "large";
  list: { label: JSX.Element }[];
};

export const Dropdown: React.FC<DropdownProps> = ({
  dir,
  end = false,
  one = false,
  mode = "click",
  children,
  list,
  size = "default",
}) => {
  let width;
  if (size === "large") {
    width = "w-140";
  } else {
    width = "w-52";
  }
  // const [show,setShow]
  return (
    <div
      className={`dropdown ${dir ? `dropdown-${dir}` : ""} ${
        end ? "dropdown-end" : ""
      } ${mode === "hover" ? "dropdown-hover pb-2 -mb-2" : ""}  `}
    >
      <label tabIndex={0} className="flex items-center justify-center">
        {children}
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box ${width}  mt-2 `}
      >
        {list.map((item, index) => {
          if (one) {
            return <>{item.label}</>;
          } else {
            return (
              <li className=" hover:bg-inherit	" key={index}>
                {item.label}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
type DropdownV1Props = {
  children: any;
  component: JSX.Element;
};
export const DropdownV1: React.FC<DropdownV1Props> = ({
  children,
  component: Component,
}) => {
  const fa = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const close = (e: any) => {
    const antEl = document.querySelector(".ant-select-dropdown");
    if (
      fa.current?.contains(e.target) ||
      window.$modal?.contains(e.target) ||
      antEl?.contains(e.target)
    )
      return;
    setShow(false);
  };
  const addEventListener = () => {
    document.addEventListener("click", close);
  };
  const removeEventListener = () => {
    document.removeEventListener("click", close);
  };
  useEffect(() => {
    if (show) {
      addEventListener();
    } else {
      window.$modal = null;
      removeEventListener();
    }
    return removeEventListener;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  return (
    <div className=" relative z-50" ref={fa}>
      <div
        id="showBtn"
        onClick={() => {
          setShow((v) => !v);
        }}
      >
        {children}
      </div>
      <div
        className={`mt-3 rounded-lg bg-base-100 border border-gray-200 absolute right-0 top-full ${
          show ? "" : "hidden"
        }`}
      >
        {Component}
      </div>
    </div>
  );
};
