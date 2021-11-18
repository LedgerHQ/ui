import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import CloseIcon from "@ledgerhq/icons-ui/react/CloseRegular";
import ArrowLeftIcon from "@ledgerhq/icons-ui/react/ArrowLeftRegular";

import baseStyled, { BaseStyledProps } from "../../styled";
import Flex from "../../layout/Flex";
import type { FlexBoxProps } from "../../layout/Flex";
import Button from "../../cta/Button";
import TransitionInOut from "../../transitions/TransitionInOut";
import TransitionScale from "../../transitions/TransitionScale";

export interface PopinProps {
  width?: number;
  height?: number;
  isOpen: boolean;
  children: React.ReactNode;
}

export type PopinHeaderProps = BaseStyledProps & {
  onClose?: () => void;
  onBack?: () => void;
  children: React.ReactNode;
};

const ICON_SIZE = 20;

const Container = styled(Flex).attrs((p) => ({
  position: "relative",
  flexDirection: "column",
  rowGap: 6,
  width: "100%",
  height: "100%",
  paddingY: p.theme.space[10],
  paddingX: p.theme.space[12],
  backgroundColor: p.theme.colors.palette.neutral.c00,
}))``;

const Wrapper = styled(Flex).attrs<FlexBoxProps>((p) => ({
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between",
  height: p.height || `${p.theme.sizes.drawer.popin.max.height}px`,
  width: p.width || `${p.theme.sizes.drawer.popin.max.width}px`,
  minHeight: `${p.theme.sizes.drawer.popin.min.height}px`,
  minWidth: `${p.theme.sizes.drawer.popin.min.width}px`,
  maxHeight: `${p.theme.sizes.drawer.popin.max.height}px`,
  maxWidth: `${p.theme.sizes.drawer.popin.max.width}px`,
  zIndex: p.theme.zIndexes[8],
}))``;

const Overlay = styled(Flex).attrs((p) => ({
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  zIndex: p.theme.zIndexes[8],
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: p.theme.colors.palette.neutral.c100a07,
}))``;

const Header = baseStyled.section`
  display: grid;
  grid-template-columns: [icon] ${ICON_SIZE}px [title] 1fr [icon] ${ICON_SIZE}px;
  column-gap: 12px;
`;

const HeaderTitleContainer = styled(Flex).attrs(() => ({
  justifyContent: "center",
}))``;

const PopinBody = baseStyled(Flex).attrs({
  as: "section",
  flexDirection: "column",
  flex: 1,
  overflow: "auto",
})``;

const PopinFooter = baseStyled(Flex).attrs({ as: "section" })``;

const IconContainer = styled(Button.Unstyled)`
  display: flex;
  align-items: center;
`;

const PopinHeader = ({ children, onClose, onBack, ...props }: PopinHeaderProps) => (
  <Header {...props}>
    <Flex>
      {onBack ? (
        <IconContainer onClick={onBack}>
          <ArrowLeftIcon size={ICON_SIZE} color="palette.neutral.c100" />
        </IconContainer>
      ) : null}
    </Flex>
    <HeaderTitleContainer>{children}</HeaderTitleContainer>
    <Flex>
      {onClose ? (
        <IconContainer onClick={onClose}>
          <CloseIcon size={ICON_SIZE} color="palette.neutral.c100" />
        </IconContainer>
      ) : null}
    </Flex>
  </Header>
);

const Popin = ({ isOpen, children, width, height }: PopinProps) => (
  <TransitionInOut in={isOpen} appear mountOnEnter unmountOnExit>
    <Overlay>
      <TransitionScale in={isOpen} appear>
        <Wrapper width={width} height={height}>
          <Container>{children}</Container>
        </Wrapper>
      </TransitionScale>
    </Overlay>
  </TransitionInOut>
);

const PopinWrapper = ({ children, ...popinProps }: PopinProps): React.ReactElement => {
  const $root = React.useMemo(() => document.querySelector("#ll-popin-root"), []);
  if ($root === null) throw new Error("popin root cannot be found");
  return ReactDOM.createPortal(<Popin {...popinProps}>{children}</Popin>, $root);
};

PopinWrapper.Header = PopinHeader;
PopinWrapper.Body = PopinBody;
PopinWrapper.Footer = PopinFooter;

export default PopinWrapper;
