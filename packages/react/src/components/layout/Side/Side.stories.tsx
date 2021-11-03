import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

import Button from "../../cta/Button";
import { lipsum } from "../../helpers";
import Side, { SideProps } from "./index";
import SideProvider, { setSide } from "./Provider";
import { Flex } from "../index";
import { Text } from "../../asorted";
import { Tip } from "../../message";

const DummyContentWrapper = styled.div`
  width: 100%;
  background-color: ${(p) => p.color};
  align-items: center;
  padding: ${(p) => p.theme.space[4]}px;
`;

const onBackLvl1 = () =>
  setSide(DummyContent, {
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

const OnboardContent = ({test}) => (
  <div>
    {[{
      title: "How does a recovery phrase work?",
      descriptions: ["Your recovery phrase works like a unique master key. Your Ledger device uses it to calculate private keys for every crypto asset you own."],
    }, {
      descriptions: ["To restore access to your crypto, any wallet can calculate the same private keys from your recovery phrase."],
      tips: [{type: 'warning', label: 'test1'}, {type: 'success', label: 'test121'}],
      link: { label: "More about the Recovery phrase", href: "somelinktothesupport.com" }
    }, {
      title: "What happens if I lose access to my Nano?",
      descriptions: ["Don’t worry and follow these steps:"]
    }].map(({ title, descriptions, link, tips}) => (
      <Flex flexDirection={'column'} mb={12}>
        { title && <Text as={'div'} variant={'h5'} textTransform={'uppercase'} mb={5}>{title}</Text> }
        { descriptions && <>{descriptions.map((description) => (<Text as={'p'} variant={'paragraph'} color={'palette.neutral.c80'} mb={5} >{description}</Text>))}</> }
        { tips && <>{tips.map(({ type, label }) => (<Flex mb={5}><Tip type={type} label={label}>{title}</Tip></Flex>))}</> }

        <Text>{test}</Text>
      </Flex>
    ))}

    <Flex><Button
      type={"main"}
      onClick={() =>
        setSide(null)
      }
      style={{flex: 1}}
    >
      {"Continue"}
    </Button></Flex>
  </div>
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

export const TemplateTmp = (args: SideProps & { isOpen: boolean }) => {
  const onClose = useCallback(() => setSide(null), []);
  const onOpen = useCallback(() => setSide(OnboardContent, {test: "bengabenga"}), []);

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

export const Default = Template.bind({});
// @ts-expect-error FIXME
Default.args = {};
