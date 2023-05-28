import React from "react";

import { Result } from "antd";

const CompletedStep: React.FC = () => {
  return (
    <Result
      status="success"
      title="Successfully uploaded video!"
    />
  );
};

export default CompletedStep;
