import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import FlexBox from "../Flex";
import Divider from "../../asorted/Divider";
import Close from "@ledgerhq/icons-ui/react/CloseMedium";
import ArrowLeft from "@ledgerhq/icons-ui/react/ArrowLeftRegular";
import TransitionSlide from "../../transitions/TransitionSlide";
import TransitionInOut from "../../transitions/TransitionInOut";
import Text from "../../asorted/Text";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
const Header = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.space[12]}px;
  padding-bottom: ${(p) => p.theme.space[10]}px;
`;

const Footer = styled(FlexBox)`
  align-items: center;
  padding: ${(p) => p.theme.space[8]}px ${(p) => p.theme.space[12]}px;
`;

const Wrapper = styled.div<{
  big?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: string;
}>`
  height: 100%;
  width: ${(p) =>
    p.big ? p.theme.sizes.drawer.side.big.width : p.theme.sizes.drawer.side.small.width}px;
  background-color: ${(p) => p.backgroundColor ?? p.theme.colors.neutral.c00};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  z-index: ${(p) => p.theme.zIndexes[8]};
`;
const Overlay = styled.div`
  display: flex;
  position: fixed;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: ${(p) => p.theme.colors.neutral.c100a07};
`;
const ScrollWrapper = styled.div`
  overflow: scroll;
  position: relative;
  padding: ${(p) => p.theme.space[12]}px;
  padding-top: 0px;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ButtonPlaceholder = styled.div`
  min-width: ${(p) => p.theme.space[13]}px;
`;
const Button = styled.button`
  background: unset;
  border: unset;
  cursor: pointer;
  color: ${(p) => p.theme.colors.neutral.c100};
`;

export interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  big?: boolean;
  ignoreBackdropClick?: boolean;
  backgroundColor?: string;
  onClose: () => void;
  onBack?: () => void;
  setTransitionsEnabled?: (arg0: boolean) => void;
  hideNavigation?: boolean;
}

const DrawerContent = ({
  isOpen,
  title,
  children,
  footer,
  big,
  onClose,
  backgroundColor,
  setTransitionsEnabled = () => 0,
  onBack,
  ignoreBackdropClick = false,
  hideNavigation = true,
}: DrawerProps) => {
  const disableChildAnimations = useCallback(
    () => setTransitionsEnabled(false),
    [setTransitionsEnabled],
  );
  const enableChildAnimations = useCallback(
    () => setTransitionsEnabled(true),
    [setTransitionsEnabled],
  );

  const handleBackdropClick = useCallback(() => {
    if (!ignoreBackdropClick) {
      onClose();
    }
  }, [onClose, ignoreBackdropClick]);

  const stopClickPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <TransitionInOut
      in={isOpen}
      appear
      mountOnEnter
      unmountOnExit
      onEntering={disableChildAnimations}
      onEntered={enableChildAnimations}
      onExiting={disableChildAnimations}
    >
      <Overlay onClick={handleBackdropClick}>
        <TransitionSlide in={isOpen} fixed reverseExit appear mountOnEnter unmountOnExit>
          <Wrapper big={big} onClick={stopClickPropagation} backgroundColor={backgroundColor}>
            <Container>
              <Header>
                {!hideNavigation && (
                  <>
                    {onBack != null ? (
                      <Button onClick={onBack}>
                        <ArrowLeft size={21} />
                      </Button>
                    ) : (
                      <ButtonPlaceholder />
                    )}
                  </>
                )}
                {(
                  <Text variant={"h3"} flex={1} textAlign="center">
                    {title}
                  </Text>
                ) || <div />}
                <FlexBox alignSelf="flex-start">
                  <Button onClick={onClose}>
                    <Close />
                  </Button>
                </FlexBox>
              </Header>
              <ScrollWrapper>{children}</ScrollWrapper>
              {footer && (
                <>
                  <Divider variant="light" />
                  <Footer>{footer}</Footer>
                </>
              )}
            </Container>
          </Wrapper>
        </TransitionSlide>
      </Overlay>
    </TransitionInOut>
  );
};

const Drawer = ({ children, ...sideProps }: DrawerProps): React.ReactElement => {
  const $root = React.useMemo(() => document.querySelector("#ll-side-root"), []);
  if ($root === null) throw new Error("side root cannot be found");
  return ReactDOM.createPortal(<DrawerContent {...sideProps}>{children}</DrawerContent>, $root);
};

export default Drawer;
