import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import FlexBox from "../../layout/Flex";
import Close from "@ledgerhq/icons-ui/react/CloseRegular";
import ArrowLeft from "@ledgerhq/icons-ui/react/ArrowLeftRegular";
import TransitionSlide from "../../transitions/TransitionSlide";
import TransitionInOut from "../../transitions/TransitionInOut";
import Text from "../../asorted/Text";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${(p) => p.theme.colors.palette.neutral.c00};
  padding: ${(p) => p.theme.space[6]}px ${(p) => p.theme.space[12]}px;
`;
const Header = styled(FlexBox)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${(p) => p.theme.space[15]}px;
`;
const Wrapper = styled.div<{
  big?: boolean;
  width?: number;
  height?: number;
}>`
  height: 100%;
  width: ${(p) =>
    p.big ? p.theme.sizes.drawer.side.big.width : p.theme.sizes.drawer.side.small.width}px;
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
  background-color: ${(p) => p.theme.colors.palette.neutral.c100a07};
`;
const ScrollWrapper = styled.div`
  overflow: scroll;
  position: relative;
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
  color: ${(p) => p.theme.colors.palette.neutral.c100};
`;

interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
  title?: React.ReactNode;
  big?: boolean;
  small?: boolean;
  onClose: () => void;
  onBack?: () => void;
  setTransitionsEnabled: (arg0: boolean) => void;
}

const Drawer = ({
  isOpen,
  title,
  children,
  big,
  onClose,
  setTransitionsEnabled,
  onBack,
}: DrawerProps) => {
  const disableChildAnimations = useCallback(
    () => setTransitionsEnabled(false),
    [setTransitionsEnabled],
  );
  const enableChildAnimations = useCallback(
    () => setTransitionsEnabled(true),
    [setTransitionsEnabled],
  );
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
      <Overlay>
        <TransitionSlide in={isOpen} fixed reverseExit appear mountOnEnter unmountOnExit>
          <Wrapper big={big}>
            <Container>
              <Header>
                {onBack != null ? (
                  <Button onClick={onBack}>
                    <ArrowLeft size={21} />
                  </Button>
                ) : (
                  <ButtonPlaceholder />
                )}
                {<Text>{title}</Text> || <div />}
                <Button onClick={onClose}>
                  <Close />
                </Button>
              </Header>
              <ScrollWrapper>{children}</ScrollWrapper>
            </Container>
          </Wrapper>
        </TransitionSlide>
      </Overlay>
    </TransitionInOut>
  );
};

const DrawerWrapper = ({ children, ...sideProps }: DrawerProps): React.ReactElement => {
  const $root = React.useMemo(() => document.querySelector("#ll-side-root"), []);
  if ($root === null) throw new Error("side root cannot be found");
  return ReactDOM.createPortal(<Drawer {...sideProps}>{children}</Drawer>, $root);
};

export default DrawerWrapper;
