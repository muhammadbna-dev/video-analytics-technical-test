import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, Result, Progress } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
dayjs.extend(customParseFormat);
dayjs.extend(utc);

import { AppContext, IAppContext } from "../context";
import callNotification from "../utils/callNotification";

import URLS from "../constants/urls";

interface Props {
  goToUploadVideoStep: Function;
  goToTncStep: Function;
  goToSuccessUploadStep: Function;
}

interface ResponseData {
  success: boolean;
  message: string;
}

const UploadingStep: React.FC<Props> = ({
  goToUploadVideoStep,
  goToTncStep,
  goToSuccessUploadStep,
}) => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const { videoData } = useContext(AppContext) as IAppContext;
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  const uploadVideo = async () => {
    const video: File | null | undefined = videoData.video;
    const title: string = videoData.videoTitle || "";
    let startDatetime: string = videoData.videoStartDatetime || "";
    const videoLocation: string = videoData.videoLocation || "";

    if (!video || !title || !startDatetime) {
      callNotification(
        "error",
        "No data found for video uploaded. Directing to upload video step."
      );
      goToUploadVideoStep();
      return;
    }

    startDatetime = dayjs(startDatetime, "DD/MM/YY HH:mm").utc().format();

    const formData: FormData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("startDatetime", startDatetime);
    if (!!videoLocation) {
      formData.append("postalCode", videoLocation);
    }
    try {
      const res = await axios.post(URLS.UPLOAD_VIDEO(), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (!!total) {
            let percent: number = Math.floor((loaded * 100) / total);
            if (percent < 100) {
              setProgressPercentage(percent);
            }
          }
        },
      });
      const responseData: ResponseData = res.data;
      if (!!responseData.success) {
        callNotification("success", "Successfully uploaded video.");
        goToSuccessUploadStep();
      } else {
        console.log(responseData);
        const message: String =
          responseData.message || "An unexpected error occurred";
        callNotification(
          "error",
          `Error uploading video. Please try again. Error: ${message}`
        );
        goToUploadVideoStep();
      }
    } catch (ex) {
      callNotification(
        "error",
        "Error uploading video. Please try again. Directing to TnC step."
      );
      goToTncStep();
    }
  };

  return (
    <div>
      {!!isConfirmed ? (
        <Result
          title="Your mp4 video is being uploaded"
          extra={
            <div>
              <Progress type="circle" percent={progressPercentage} />
            </div>
          }
        />
      ) : (
        <Button
          onClick={() => {
            setIsConfirmed(true);
            uploadVideo();
          }}
        >
          Proceed with upload
        </Button>
      )}
    </div>
  );
};

export default UploadingStep;
