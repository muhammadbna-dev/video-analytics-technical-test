import { createContext } from "react";

export interface IVideoData {
  videoTitle: string;
  videoStartDatetime: string;
  videoLocation: string;
  video: File | undefined | null;
}

export interface IAppContext {
  videoData: IVideoData;
  saveVideoData: (videoData: IVideoData) => void;
}

export const AppContext = createContext<IAppContext | null>(null);
