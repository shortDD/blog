import { useRef, useState } from "react";
import { IButton } from "./button";
import { TbSearch } from "react-icons/tb";
import { initHistoryList } from "@/utils";
import { useAddClass } from "@/hooks";
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
  const searchHistoryEl = useRef(null);
  const [toggleSearchHistory] = useAddClass(searchHistoryEl, {
    default: "translate-x-0",
    replaceValue: "",
  });
  return (
    <div className="relative">
      <form className="flex items-center">
        <input
          value={val}
          onChange={(e) => {
            onSearch(e.target.value);
            setVal(e.target.value);
          }}
          onClick={() => {
            toggleSearchHistory();
          }}
          placeholder="探索"
          className="h-8 w-full outline-none border pl-2 py-1 rounded-l-md focus:border-primary transition duration-300"
        />
        <div className="w-8 h-8 flex items-center justify-center border  rounded-r-md hover:border-primary hover:text-primary cursor-pointer transition duration-300">
          <TbSearch />
        </div>
      </form>
      {/* 历史记录 */}
      {history && <SearchHistory ref={searchHistoryEl} />}
    </div>
  );
};
interface IProps {
  ref: any;
}
export const SearchHistory: React.FC<IProps> = ({ ref }) => {
  initHistoryList();
  return (
    <div
      ref={ref}
      className="absolute top-8 bg-base-100 left-0 w-full border h-64 rounded-br-md rounded-bl-md z-50 overflow-hidden translate-x-0"
    ></div>
  );
};
