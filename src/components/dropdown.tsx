type DropdownProps = {
  dir?: "left" | "right" | "top" | "bottom";
  end?: boolean;
  mode?: "hover" | "click";
  children: any;
  list: { label: JSX.Element }[];
};

export const Dropdown: React.FC<DropdownProps> = ({
  dir,
  end = false,
  mode = "click",
  children,
  list,
}) => {
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
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52  mt-2"
      >
        {list.map((item, index) => (
          <li key={index}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
};
