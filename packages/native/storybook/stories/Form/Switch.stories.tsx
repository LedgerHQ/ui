import { storiesOf } from "../storiesOf";
import { boolean, text } from "@storybook/addon-knobs";

import React, { useState } from "react";
import Switch from "@components/Form/Switch";

export const SwitchStory = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked((prev) => !prev);

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      disabled={boolean("disabled", false)}
      label={text("label", "Label")}
    />
  );
};

storiesOf((story) => story("Form", module).add("Switch", SwitchStory));
