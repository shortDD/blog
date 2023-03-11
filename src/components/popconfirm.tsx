interface PopconfirmProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  children: any;
}
export const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  okText = "确定",
  cancelText = "取消",
  children,
}) => {
  const open = (e: any) => {
    const clientWidth = e.target.clientWidth;
  };
  return (
    <div className="" onClick={open}>
      <>{children}</>
    </div>
  );
};
