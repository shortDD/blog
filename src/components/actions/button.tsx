interface IButtonProps {
  text: string;
  click: React.MouseEventHandler<HTMLDivElement>;
}
export const IButton: React.FC<IButtonProps> = ({ text, click }) => {
  return (
    <div
      onClick={click}
      className=" inline-block rounded-md bg-primary py-2 px-4 text-white hover:opacity-80 transition duration-200 cursor-pointer"
    >
      {text}
    </div>
  );
};
