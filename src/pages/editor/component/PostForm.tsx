import { Select, Space } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState, useContext, useEffect, useRef } from "react";
import Message from "@/components/message";
import "./index.css";
import { useMutation } from "react-query";
import { updateApi } from "@/api/create";
import { useNavigate, useParams } from "react-router-dom";
import { EditorData } from "..";
import { seeTagsApi } from "@/api/blog";
import { uploadApi } from "@/api/upload";

const { Option } = Select;
interface PostFormProps {
  defaultTags?: string[];
  cover?: string;
}
export const PostForm: React.FC<PostFormProps> = ({ defaultTags, cover }) => {
  const { html, title } = useContext(EditorData);
  // 编辑摘要
  const [text, setText] = useState<string>("");

  // 封面
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  // 标签
  const resTags = useRef<any>();
  const [tags, setTags] = useState<string[]>();
  const handleChange = (value: string[]) => {
    resTags.current = value;
  };
  // 请求标签
  const { mutate: seeTags } = useMutation("tags", seeTagsApi, {
    onSuccess(data: any) {
      if (data.ok) {
        setTags(data.tags.map((tag: any) => tag.tagname));
      }
    },
  });

  useEffect(() => {
    seeTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 发布文章
  const navigate = useNavigate();
  const param = useParams();
  const { mutate, isLoading } = useMutation(updateApi);
  const post = () => {
    if (isLoading) return;
    if (!param.id || !html || !title) {
      Message.info("文章内容不能为空");
      return;
    }
    if (!tags?.length) {
      Message.info("请至少选择一个标签");
      return;
    }
    mutate(
      {
        blogId: Number(param.id),
        data: {
          status: 1,
          tags: resTags.current,
          ...(fileList[0] && { cover: fileList[0].response }),
        },
      },
      {
        onSuccess(data: any) {
          if (data.ok) {
            Message.info("发布成功");
            setTimeout(() => {
              navigate("/creator");
            }, 888);
          } else {
            Message.info(data.error);
          }
        },
      }
    );
  };
  return (
    <div className="w-140">
      <div className=" pt-6 pb-4 px-5 text-lg leading-6 font-medium border-b border-b-gray-200">
        发布文章
      </div>
      {/* 标签 */}
      <div className="form-item">
        <div className=" w-20">添加标签：</div>
        <Select
          mode="multiple"
          style={{ flex: 1 }}
          placeholder="select one country"
          onChange={handleChange}
          optionLabelProp="label"
          value={defaultTags}
        >
          {tags?.map((tag) => (
            <Option value={tag} label={tag} key={tag}>
              <Space>{tag}</Space>
            </Option>
          ))}
        </Select>
      </div>
      {/* 上传图片 */}
      <div className="form-item">
        <div className="w-20">文章封面：</div>
        <ImgCrop
          aspectSlider
          showReset
          fillColor="black"
          quality={1}
          rotationSlider
          beforeCrop={() => {
            setTimeout(() => {
              window.$modal = document.querySelector(".ant-modal-root");
            }, 500);
            return true;
          }}
        >
          <Upload
            maxCount={1}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            customRequest={async (options) => {
              const formData = new FormData();
              formData.append("file", options.file);
              const { fileUrl } = (await uploadApi(formData)) as any;
              options.onSuccess!(fileUrl);
            }}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>

      {/* 编辑摘要 */}
      <div className="form-item">
        <div className="w-20">编辑摘要：</div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className=" flex-1 focus:border-primary focus:outline-none border border-gray-300 rounded-md p-2  bg-gray-100"
        />
      </div>
      {/* 按键 */}
      <div className=" form-item bottom-0 left-0  justify-end  ">
        <button
          onClick={() => {
            document.documentElement.click();
          }}
          className="w-20 border border-primary rounded-md py-1 mr-3 text-primary"
        >
          取消
        </button>
        <button
          onClick={post}
          className="text-white w-20 bg-primary rounded-md py-1"
        >
          确认发布
        </button>
      </div>
    </div>
  );
};

export const PostForm1 = () => {
  return <div className="artboard phone-2">375×667</div>;
};
