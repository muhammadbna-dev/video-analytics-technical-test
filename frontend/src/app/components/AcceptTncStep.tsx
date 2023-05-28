import React, { useState } from "react";
import { Checkbox, Button } from "antd";

interface Props {
  previousStep: Function;
  nextStep: Function;
}

const AcceptTncStep: React.FC<Props> = ({ previousStep, nextStep }) => {
  const [checkedTnc, setCheckedTnc] = useState<boolean>(false);

  return (
    <div className="centralize-div step-div">
      <h1>Terms and conditions for uploading video</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac
        tincidunt nibh. Sed pretium erat in ante ullamcorper auctor. Curabitur
        finibus, arcu vitae volutpat scelerisque, sapien est auctor ex, eget
        dictum tellus erat sit amet tellus. Mauris pulvinar sapien in volutpat
        convallis. Vestibulum sit amet consectetur orci, ut semper dui. Maecenas
        vel est sodales ligula tincidunt dictum at sed lectus. Suspendisse
        bibendum leo in scelerisque efficitur. Nullam porta consequat justo sed
        tincidunt. Integer eu pharetra justo, vitae iaculis sapien. Sed a leo et
        odio facilisis cursus a vestibulum neque. In facilisis euismod risus,
        tincidunt gravida diam maximus ac. Aliquam malesuada odio ut neque
        viverra molestie. Cras porttitor metus et nisl pulvinar vestibulum.
        Fusce at sagittis enim.{" "}
      </p>
      <Checkbox
        onChange={() => setCheckedTnc(!checkedTnc)}
        checked={checkedTnc}
      >
        Accept
      </Checkbox>
      <Button onClick={() => previousStep()}>Go back</Button>
      <Button
        type="primary"
        disabled={!checkedTnc}
        size="large"
        onClick={() => nextStep()}
      >
        Upload
      </Button>
    </div>
  );
};

export default AcceptTncStep;
