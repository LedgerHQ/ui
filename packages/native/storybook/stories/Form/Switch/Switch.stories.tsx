import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import CenterView from "../../CenterView";
import Switch from "../../../../src/components/Form/Switch";

const SwitchStory = (): JSX.Element => {
  const [value, setValue] = React.useState(true);

  const onChange = () => setValue(value);

  return (
    <Switch
      label={'toto'}
      value={value}
      onChange={onChange}
    />
  );
};

storiesOf("Form", module)
  .addDecorator(withKnobs)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("Switch", () => <SwitchStory />);
