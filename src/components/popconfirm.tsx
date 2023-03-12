/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from "react-dom";

interface PopconfirmProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  children?: any;
  htmlFor: string;
}
export const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  okText = "确定",
  cancelText = "取消",
  children,
  htmlFor,
}) => {
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
      <Popcontent
        title={title}
        description={description}
        onConfirm={onConfirm}
        htmlFor={htmlFor}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      />
    </>
  );
};

const Popcontent: React.FC<PopconfirmProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  okText = "确定",
  cancelText = "取消",
  htmlFor,
}) => {
  const overflowAuto = () => {
    document.documentElement.style.overflow = "auto";
  };
  return ReactDOM.createPortal(
    <>
      <input type="checkbox" id="log-out" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action">
            <label
              htmlFor={htmlFor}
              className="btn"
              onClick={() => {
                onCancel && onCancel();
                overflowAuto();
              }}
            >
              {cancelText}
            </label>
            <label
              htmlFor={htmlFor}
              className="btn"
              onClick={() => {
                onConfirm();
                overflowAuto();
              }}
            >
              {okText}
            </label>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
