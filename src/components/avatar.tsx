import { forwardRef } from "react";

const avatar =
  "https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
type AvatarProps = {
  url: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32";
  round?: "xl" | "full";
  //   ref?: React.LegacyRef<HTMLDivElement> | undefined;
};

export const Avatar = forwardRef(
  (
    { size = "16", round, url }: AvatarProps,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    return (
      <div className="avatar">
        <div
          className={` w-${size} max-md:w-10 rounded${
            round ? "-" + round : ""
          } transition-all duration-300`}
          ref={ref}
        >
          <img src={url ? url : avatar} alt="" />
        </div>
      </div>
    );
  }
);
