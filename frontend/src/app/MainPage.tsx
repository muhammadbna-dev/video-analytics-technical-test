import React, { ReactNode, useState } from "react";
import * as step from "./constants/steps";

import UploadVideoStep from "./components/UploadVideoStep";
import AcceptTncStep from "./components/AcceptTncStep";
import UploadingStep from "./components/UploadingStep";
import CompletedStep from "./components/CompletedStep";

import "./main.less";

const MainPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<string>(
    step.UPLOAD_VIDEO_STEP
  );
  let component: ReactNode = <></>;

  if (currentStep === step.UPLOAD_VIDEO_STEP) {
    component = (
      <UploadVideoStep nextStep={() => setCurrentStep(step.ACCEPT_TNC_STEP)} />
    );
  } else if (currentStep === step.ACCEPT_TNC_STEP) {
    component = (
      <AcceptTncStep
        previousStep={() => setCurrentStep(step.UPLOAD_VIDEO_STEP)}
        nextStep={() => setCurrentStep(step.UPLOADING_STEP)}
      />
    );
  } else if (currentStep === step.UPLOADING_STEP) {
    component = (
      <UploadingStep
        goToUploadVideoStep={() => setCurrentStep(step.UPLOAD_VIDEO_STEP)}
        goToTncStep={() => setCurrentStep(step.ACCEPT_TNC_STEP)}
        goToSuccessUploadStep={() => setCurrentStep(step.COMPLETED_STEP)}
      />
    );
  } else if (currentStep === step.COMPLETED_STEP) {
    component = <CompletedStep />;
  } else {
    console.error(`Invalid step found: ${currentStep}`);
    component = <div>Error</div>;
  }

  return <main>{component}</main>;
};

export default MainPage;
