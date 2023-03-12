import ReactDOM from "react-dom";

type PopLoginProps = {
  children: any;
  htmlFor: string;
  element: JSX.Element;
};
export const PopLogin: React.FC<PopLoginProps> = ({
  htmlFor,
  children,
  element,
}) => {
  const flag = document.querySelector(`#${htmlFor}`);
  return (
    <>
      <label
        htmlFor={htmlFor}
        onClick={() => {
          document.documentElement.style.overflow = "hidden";
        }}
      >
        {children}
      </label>
      {!flag && <PopLoginContent htmlFor={htmlFor} element={element} />}
    </>
  );
};

type PopLoginContentProps = {
  htmlFor: string;
  element: JSX.Element;
};
const PopLoginContent: React.FC<PopLoginContentProps> = ({
  htmlFor,
  element,
}) => {
  return ReactDOM.createPortal(
    <>
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative max-w-3xl h-96">
          <label
            htmlFor={htmlFor}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              document.documentElement.style.overflow = "auto";
            }}
          >
            ✕
          </label>
          {element}
        </div>
      </div>
    </>,
    document.body
  );
};
