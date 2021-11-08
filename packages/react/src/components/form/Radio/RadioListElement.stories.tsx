import React from "react";

import Radio from "./index";

export default {
  title: "Form/Radio",
};

const Template = () => {
  return (
    <Radio currentValue="first" name="radioListElement" onChange={() => {}}>
      <Radio.ListElement label="Selected" value="first" />
      <Radio.ListElement label="Unselected" value="second" />
    </Radio>
  );
};

export const RadioListElement = Template.bind({});
