import { useState } from "react";
import { IButton } from "./button";
import { TbSearch } from "react-icons/tb";
import { addHistory, clearAll, initHistoryList } from "@/utils";
export const SearchV1 = () => {
  const submit = () => {};
  return (
    <div className=" flex items-center mb-2">
      <input
        className=" outline-none border p-2 mr-2 flex-1 focus:border-primary transition duration-300 rounded-md"
        placeholder="请输入内容"
      />
      <IButton text="搜索" click={submit} />
    </div>
  );
};
type onSearchType = (val: string) => void;
export const SearchV2 = ({
  onSearch,
  history,
}: {
  onSearch: onSearchType;
  history: boolean;
}) => {
  const [val, setVal] = useState<string>("");
  const [focus, setFocus] = useState(false);
  const search = () => {
    if (!val.trim()) return;
    console.log("search");
    addHistory(val);
  };
  return (
    <div className="relative">
      <form className="flex items-center">
        <input
          value={val}
          onChange={(e) => {
            onSearch(e.target.value);
            setVal(e.target.value);
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 100);
          }}
          placeholder="探索"
          className="h-8 w-full outline-none border pl-2 py-1 rounded-l-md focus:border-primary transition duration-300"
        />
        <div
          onClick={search}
          className="w-8 h-8 flex items-center justify-center border  rounded-r-md hover:border-primary hover:text-primary cursor-pointer transition duration-300"
        >
          <TbSearch />
        </div>
      </form>
      {/* 历史记录 */}
      {history && focus && !val && <SearchHistory />}
    </div>
  );
};

export const SearchHistory: React.FC = () => {
  const list = initHistoryList();
  return (
    <>
      {Boolean(list.length) && (
        <ul className=" text-xs  absolute top-8 bg-base-100 left-0 w-full border  rounded-br-md rounded-bl-md z-50 overflow-hidden translate-x-0">
          <li className=" border-b ">
            <div className="flex justify-between items-center px-2 h-8 leading-8">
              <span>搜索历史</span>
              <span
                className=" text-primary cursor-pointer"
                onClickCapture={clearAll}
              >
                清空
              </span>
            </div>
          </li>
          {list.map((history, index) => (
            <li
              key={index}
              className="px-2  h-7 leading-7 hover:bg-secondary cursor-pointer"
            >
              {history}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
