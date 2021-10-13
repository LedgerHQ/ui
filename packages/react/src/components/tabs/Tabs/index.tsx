import React, { useState, useEffect, useRef, forwardRef } from "react";
import styled, { useTheme } from "styled-components";
import Flex from "@components/layout/Flex";
import Badge from "@components/toasts/Badge";
import Text from "@components/asorted/Text";

export type Props = React.PropsWithChildren<{
  /**
   * An optional callback that will be called when the active tab changes.
   */
  onTabChange?: (index: number) => void;
  /**
   * The tab index to mark as active when rendering for the first time.
   * If omitted, then initially no tabs will be selected.
   */
  activeIndex?: number;
  tabs: {
    index: number;
    title: string;
    disabled?: boolean;
    badge?: string | number;
    Component: React.ReactFragment;
  }[];
}>;

const Container = styled(Flex).attrs({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})``;

const TabHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`

const TabHeaderContent = styled(Flex).attrs({
  flex: 1,
  alignItems: "center",
})`
  width: 100%;
`;

const TabHeaderBox = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-grow: inherit;
  justify-content: center;
  text-align: center;
  cursor: ${(p) =>
    p.disabled ? "default" : "pointer"};
  padding: 8px 12px;
`;

const HeaderTitle = styled(Text).attrs({
  fontWeight: "600",
})<{ selected: boolean }>`
  margin-inline: 12px;
  color: ${(p) =>
    p.selected ? p.theme.colors.palette.neutral.c100 : p.theme.colors.palette.neutral.c80};
`;

const HeaderBottomBarFixed = styled(Flex).attrs({
  flex: 1,
})`
  width: 100%;
  position: relative;
  top: 3px;
  border-bottom: 1px solid ${(p) => p.theme.colors.palette.neutral.c40};
`;

const HeaderBottomBarMoving = styled.div<HeaderBottomBarProps>`
  position: relative;
  left: ${(p) => p.left}px;
  width: ${(p) => p.width}px;
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-bottom: solid 3px;
  border-bottom-color: ${(p) => p.theme.colors.palette.primary.c70};
`;

interface HeaderBottomBarProps {
  left: number, 
  width: number,
}

const MyBottomBar = (props: HeaderBottomBarProps) => {  
  const {width, left} = props;
  return <>
    <HeaderBottomBarFixed />
    <HeaderBottomBarMoving width={width} left={left} />
  </>;
};

interface HeaderElementProps {
  title: string;
  selected: boolean;
  disabled: boolean;
  badge?: string | number;
  onClick: () => void;
}

const HeaderElement = forwardRef<HTMLDivElement, HeaderElementProps>( (props, ref) => {
  const { onClick, badge, disabled, selected, title } = props;
  return (
    <TabHeaderBox ref={ref} disabled={disabled} onClick={onClick}>
      <HeaderTitle selected={selected}>
        {title}
      </HeaderTitle>
      {(badge || badge === 0) && <Badge value={badge} />}
    </TabHeaderBox>
  );
});

const MainContent = styled(Flex).attrs({
  flex: 1,
})<{ active?: boolean}>`
  width: 100%;
  color: ${(p) =>
    p.active ? p.theme.colors.palette.neutral.c00 : p.theme.colors.palette.neutral.c70};
  background-color: ${(p) =>
    p.active ? p.theme.colors.palette.neutral.c100 : p.theme.colors.palette.neutral.c00};
`;

export default function Tabs(props: Props): JSX.Element {
  const { tabs, onTabChange } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [bottomBar, updateBottomBar] = useState<HeaderBottomBarProps>({ left:0, width: 0 });
  const mainTab = activeIndex >= 0 ? tabs[activeIndex] : null;
  const refs = tabs.map(t => useRef<HTMLDivElement>(null));

  useEffect(
    () => {
      const newIndex = props.activeIndex || activeIndex
      setActiveIndex(newIndex);

      if(refs[0].current){
        const refsToHandle = refs.slice(0, activeIndex);
        const width = refs[newIndex].current?.offsetWidth || 0;
        const left = refsToHandle.reduce(
          (total, ref) => total + (ref.current?.offsetWidth || 0),
          0,
        );
        updateBottomBar({
          width,
          left
        })
      }
    },
    [activeIndex],
  );

  const onTabClick = (index: number) => {
    if(!tabs[index].disabled){
      setActiveIndex(index);
      onTabChange && onTabChange(index);
    }
  };

  return (
    <Container>
      <TabHeader>
        <TabHeaderContent>
          {tabs.map((tab, i) => (
            <HeaderElement
              ref={refs[i]}
              title={tab.title}
              selected={activeIndex === i}
              badge={tab.badge}
              disabled={!!tab.disabled}
              onClick={() => onTabClick(i)}
            />
          ))}
        </TabHeaderContent>
        <MyBottomBar width={bottomBar.width} left={bottomBar.left} />
      </TabHeader>
      <MainContent>{mainTab && mainTab.Component}</MainContent>
    </Container>
  );
}
