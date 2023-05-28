import React, { ChangeEvent, useState, useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";

import callNotification from "../utils/callNotification";
import { AppContext, IAppContext } from "../context";

import "../main.less";

const MAX_FILE_SIZE: number = 5242880;

interface Props {
  nextStep: Function;
}

const UploadVideoStep: React.FC<Props> = ({ nextStep }) => {
  const [form] = Form.useForm();
  const { videoData, saveVideoData } = useContext(AppContext) as IAppContext;
  const [video, setVideo] = useState<File | null | undefined>(videoData.video);
  const [title, setTitle] = useState<string>(videoData.videoTitle);
  const [datetime, setDatetime] = useState<string>(
    videoData.videoStartDatetime
  );
  const [location, setLocation] = useState<string>(videoData.videoLocation);
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    if (!!video) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        const url: string | null | ArrayBuffer = reader.result;
        if (!!url && typeof url === "string") {
          setThumbnail(url);
        }
      };
      reader.readAsDataURL(video);
    }
  }, [video]);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    const uploadedVideo: File | undefined = files?.[0];
    if (!uploadedVideo) {
      return callNotification("error", "No file uploaded. Please try again.");
    }

    if (uploadedVideo.size > MAX_FILE_SIZE) {
      form.setFieldValue("video", null);
      return callNotification(
        "error",
        "Maximum file size is 5MB. Please try again"
      );
    }

    setVideo(uploadedVideo);
  };

  const onSubmit = (values: {
    title: string;
    startDatetime: string;
    location: string;
  }) => {
    if (!video) {
      return callNotification(
        "error",
        "Maximum file size is 5MB. Please try again"
      );
    }

    saveVideoData({
      videoTitle: values.title,
      videoStartDatetime: values.startDatetime,
      videoLocation: values.location || "",
      video,
    });
    nextStep();
  };

  return (
    <div className="centralize-div step-div">
      <h1>Upload video</h1>
      <Form
        name="basic"
        initialValues={{
          title,
          startDatetime: datetime,
          location,
          video,
        }}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Upload mp4 video (Max file size is 5MB)"
          name="video"
          rules={[{ required: true, message: "Please upload a video!" }]}
        >
          <>
            <input
              id="file-input"
              type="file"
              accept="video/mp4"
              name="video"
              onChange={onUpload}
            />
            {!!video && <p>Video filename: {video.name}</p>}
            {!!thumbnail && <video width={300} height={177} src={thumbnail} />}
          </>
        </Form.Item>
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "Please input the video title!" },
            { whitespace: true, message: "No whitespace allowed!" },
          ]}
        >
          <Input
            addonBefore="Video title"
            maxLength={100}
            showCount={true}
            size="large"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
          />
        </Form.Item>
        <Form.Item
          name="startDatetime"
          rules={[
            // TODO: Cannot exceed today's date
            {
              required: true,
              message: "Please input the video start date time!",
            },
            { whitespace: true, message: "No whitespace allowed!" },
            {
              pattern:
                /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4} ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
              message: "Video start date is not in the right format!",
            },
          ]}
        >
          <Input
            addonBefore="Video start datetime (DD/MM/YYY MM:ss)"
            maxLength={16}
            size="large"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDatetime(e.target.value)
            }
            value={datetime}
          />
        </Form.Item>
        <Form.Item
          name="location"
          rules={[
            { whitespace: true, message: "No whitespace allowed!" },
            {
              pattern: /\d{6}/,
              message:
                "Video location (postal code) has to be exactly 6 digits!",
            },
          ]}
        >
          <Input
            addonBefore="Video location (postal code)"
            maxLength={6}
            size="large"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLocation(e.target.value)
            }
            value={location}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadVideoStep;
