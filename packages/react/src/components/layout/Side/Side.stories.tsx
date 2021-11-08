import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

import Button from "../../cta/Button";
import { lipsum } from "../../helpers";
import Side, { SideProps } from "./index";
import SideProvider, { setSide } from "./Provider";
import SideDrawer, { SideDrawerProps } from "./Side";
import { Flex } from "../index";

const DummyContentWrapper = styled.div`
  width: 100%;
  background-color: ${(p) => p.color};
  align-items: center;
  padding: ${(p) => p.theme.space[4]}px;
`;

const onBackLvl1 = () =>
  setSide<SideProps & { left: boolean }>(DummyContent, {
    left: true,
  });

const onBackLvl2 = () =>
  setSide(DummySubContentLvl1, {
    onBack: onBackLvl1,
    left: true,
  });

const DummyContent = () => (
  <DummyContentWrapper color={"#957DAD"}>
    <Button
      onClick={() =>
        setSide(DummySubContentLvl1, {
          onBack: onBackLvl1,
          left: true,
        })
      }
    >
      {"Go to level 2"}
    </Button>
  </DummyContentWrapper>
);

const DummySubContentLvl1 = () => (
  <DummyContentWrapper color={"#E0BBE4"}>
    <Button
      onClick={() =>
        setSide(DummySubContentLvl2, {
          onBack: onBackLvl2,
          left: true,
        })
      }
    >
      {"Go to level 3"}
    </Button>
    <div>{lipsum}</div>
  </DummyContentWrapper>
);

const DummySubContentLvl2 = () => (
  <DummyContentWrapper color={"#FEC8D8"}>
    <div>{lipsum}</div>
  </DummyContentWrapper>
);

const components = {
  DummyContent,
  DummySubContentLvl1,
  DummySubContentLvl2,
};

export default {
  title: "Layout/Drawer/Side",
  component: Side,
  argTypes: {
    isOpen: {
      type: "boolean",
      value: true,
      description: "Is open",
      required: false,
      control: {
        type: "boolean",
      },
    },
    title: {
      type: "text",
      description: "Side default title",
      defaultValue: "Default title",
      control: {
        type: "text",
      },
      required: false,
    },
    big: {
      type: "boolean",
      value: true,
      description: "Larger width side drawer.",
      required: false,
      control: {
        type: "boolean",
      },
    },
  },
};

const Template = (args: SideProps & { isOpen: boolean }) => {
  const onClose = useCallback(() => setSide(null), []);
  const onOpen = useCallback(() => setSide(components.DummyContent), []);

  useEffect(() => {
    if (args.isOpen) onOpen();
    if (!args.isOpen) onClose();
  }, [args.isOpen, onClose, onOpen]);

  return (
    <SideProvider>
      <Side {...args} />
    </SideProvider>
  );
};

export const SideSimple = ({ title, big }: SideDrawerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Button type={"main"} onClick={() => setIsOpen(true)} style={{ flex: 1 }}>
        Open
      </Button>
      <SideDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} big={big}>
        <Flex flexDirection={"column"}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit mi, tempus sed justo
            et, viverra mattis lorem. Praesent odio ligula, facilisis id porttitor tempor, cursus at
            metus. Etiam consequat ante efficitur sodales iaculis. Aliquam at justo vel erat
            eleifend semper eu non lorem. Cras porta, dolor a porttitor varius, augue lectus congue
            lorem, nec lobortis urna ipsum quis lorem. Nam quis auctor lacus. Aenean sit amet dictum
            purus, at convallis neque. Etiam ac augue non risus luctus laoreet eget a est. Curabitur
            magna purus, fermentum at eros a, faucibus sollicitudin erat. Proin purus sem, lacinia
            tincidunt ornare et, sollicitudin nec libero. Quisque lobortis dui ac lacus mollis
            posuere. Morbi vitae ligula commodo, scelerisque sapien quis, vulputate justo. Cras
            sagittis, ligula quis mollis porttitor, massa neque faucibus mauris, quis consectetur
            eros nibh a ante. Quisque ac porttitor ante. Curabitur in neque a nisl aliquet finibus.
            Mauris in sapien nec odio molestie vulputate. Suspendisse vitae lorem non quam dapibus
            cursus sit amet a mauris.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit mi, tempus sed justo
            et, viverra mattis lorem. Praesent odio ligula, facilisis id porttitor tempor, cursus at
            metus. Etiam consequat ante efficitur sodales iaculis. Aliquam at justo vel erat
            eleifend semper eu non lorem. Cras porta, dolor a porttitor varius, augue lectus congue
            lorem, nec lobortis urna ipsum quis lorem. Nam quis auctor lacus. Aenean sit amet dictum
            purus, at convallis neque. Etiam ac augue non risus luctus laoreet eget a est. Curabitur
            magna purus, fermentum at eros a, faucibus sollicitudin erat. Proin purus sem, lacinia
            tincidunt ornare et, sollicitudin nec libero. Quisque lobortis dui ac lacus mollis
            posuere. Morbi vitae ligula commodo, scelerisque sapien quis, vulputate justo. Cras
            sagittis, ligula quis mollis porttitor, massa neque faucibus mauris, quis consectetur
            eros nibh a ante. Quisque ac porttitor ante. Curabitur in neque a nisl aliquet finibus.
            Mauris in sapien nec odio molestie vulputate. Suspendisse vitae lorem non quam dapibus
            cursus sit amet a mauris.
          </p>

          <Flex>
            <Button type={"main"} onClick={() => setIsOpen(false)} style={{ flex: 1 }}>
              {"Continue"}
            </Button>
          </Flex>
        </Flex>
      </SideDrawer>
    </div>
  );
};

export const Default = Template.bind({});
// @ts-expect-error FIXME
Default.args = {};
