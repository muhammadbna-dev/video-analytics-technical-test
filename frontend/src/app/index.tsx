import React, { useState } from "react";

import { AppContext, IVideoData } from "./context";
import MainPage from "./MainPage";

export const App: React.FC = () => {
  const [videoData, setVideoData] = useState<IVideoData>({
    videoTitle: "",
    videoStartDatetime: "",
    videoLocation: "",
    video: null,
  });

  const saveVideoData = (videoData: IVideoData) => {
    setVideoData(videoData);
  };

  return (
    <AppContext.Provider value={{ videoData, saveVideoData }}>
      <MainPage />
    </AppContext.Provider>
  );
};

export default App;
