export type TagType = {
  tagname: string;
};
interface TagsProps {
  tags: TagType[];
}
export const Tags: React.FC<TagsProps> = ({ tags }) => {
  const searchByTags = () => {
    // 此处调用接口
  };
  return (
    <div className="flex md:flex-wrap items-center overflow-auto">
      {tags.map((tag, index) => (
        <div
          onClick={searchByTags}
          key={index}
          className=" whitespace-nowrap inline-block mr-2 md:mb-2 border px-3 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white"
        >
          {tag.tagname}
        </div>
      ))}
    </div>
  );
};
