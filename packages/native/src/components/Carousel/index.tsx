import React, { useEffect, useState, useRef, useCallback } from "react";
import { Platform, ScrollView, ViewProps, NativeScrollEvent } from "react-native";
import { Flex, SlideIndicator } from "../index";
import type { Props as FlexboxProps } from "../Layout/Flex";
import styled from "../styled";

const PressableFlex = styled.Pressable`
  display: flex;
`;

const HorizontalScrollView = styled.ScrollView.attrs({ horizontal: true })`
  flex: 1;
`;

export type Props = React.PropsWithChildren<{
  /**
   * Forces the selection of a specific item of the carousel.
   */
  activeIndex?: number;
  /**
   * Called when the active carousel index is updated.
   */
  onChange?: (index: number) => void;
  /**
   * Called when Carousel try to scroll before the first or after the last item (if restartAfterEnd is false).
   */
  onOverflow?: (side: "start" | "end", fromAutoDelay: boolean) => void;
  /**
   * This number in milliseconds will enable automatic scrolling when defined.
   *
   * The Carousel will scroll to the next item after this delay is elapsed,
   * unless the user is currently dragging the content.
   *
   * This delay will also reset whenever the user taps on an indicator bullet to
   * manually change the carousel item displayed.
   */
  autoDelay?: number;
  /**
   * When the delay is elasped, if the Carousel is at the last item, it will scroll back to the beginning.
   */
  restartAfterEnd?: boolean;
  /**
   * When the user tap on one side of an item, it will scroll to the next or precedent item. Same behavior as Instagram or Snapchat. Default: false.
   */
  scrollOnSidePress?: boolean;
  /**
   * Additional props to pass to the outer container.
   * This container is a Flex element.
   */
  containerProps?: FlexboxProps;
  /**
   * Additional props to pass to the ScrollView element.
   * See: https://reactnative.dev/docs/scrollview
   */
  scrollViewProps?: React.ComponentProps<typeof HorizontalScrollView>;
  /**
   * Additional props to pass to the indicators container.
   * This container is a Flex element.
   */
  slideIndicatorContainerProps?: FlexboxProps & ViewProps;

  IndicatorComponent?:
    | React.ComponentType<{
        activeIndex: number;
        slidesLength: number;
        onChange?: (index: number) => void;
        duration?: number;
      }>
    | React.ReactElement;
}>;

function Carousel({
  activeIndex = 0,
  autoDelay,
  restartAfterEnd = true,
  scrollOnSidePress = false,
  containerProps,
  slideIndicatorContainerProps,
  scrollViewProps,
  onChange,
  onOverflow,
  IndicatorComponent = SlideIndicator,
  children,
  isPaused,
}: Props) {
  const [init, setInit] = useState(false);
  const [activeIndexState, setActiveIndexState] = useState(activeIndex);
  const disableTimer = useRef(false);
  const launchTimestamp = useRef(null);
  const timeRemaining = useRef(autoDelay);

  const [resetTimer, setResetTimer] = useState({});
  const dimensions = useRef<{
    contentWidth: number;
    contentHeight: number;
  } | null>(null);
  const slidesLength = React.Children.count(children);
  const scrollRef = useRef<ScrollView | null>(null);

  const fullWidth = 100 * slidesLength;
  const itemWidth = !dimensions.current ? 0 : dimensions.current.contentWidth / slidesLength;

  const scrollToIndex = useCallback(
    (index, animated = true) => {
      if (scrollRef.current && dimensions.current) {
        scrollRef.current.scrollTo({
          x: itemWidth * index,
          animated,
        });
      }
    },
    [itemWidth],
  );

  useEffect(() => {
    // On init scroll to the active index prop location - if specified.
    if (init && activeIndex) {
      scrollToIndex(activeIndex, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  useEffect(() => {
    if (scrollToIndex && typeof activeIndex === "number") {
      scrollToIndex(activeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    dimensions.current = { contentWidth, contentHeight };
    setInit(true);
  };

  const onTap = useCallback(
    (event) => {
      const tapPositionXPercent = event.nativeEvent.locationX / itemWidth;
      if (tapPositionXPercent > 0.25) {
        if (slidesLength > activeIndexState + 1) {
          scrollToIndex(activeIndexState + 1, false);
        } else {
          onOverflow && onOverflow("end", false);
        }
      } else if (activeIndexState > 0) {
        scrollToIndex(activeIndexState - 1, false);
      } else {
        onOverflow && onOverflow("start", false);
      }
    },
    [slidesLength, activeIndexState, scrollToIndex, onOverflow, itemWidth],
  );

  const onScroll = ({
    nativeEvent: { contentOffset, contentSize },
  }: {
    nativeEvent: NativeScrollEvent;
  }) => {
    const newIndex = Math.abs(Math.round((contentOffset.x / contentSize.width) * slidesLength));
    setActiveIndexState(newIndex);
    onChange && onChange(newIndex);
  };

  useEffect(() => {
    console.log("useEffect")
    if (!autoDelay) return;

    console.log("isPaused", isPaused, timeRemaining.current, launchTimestamp.current, )
    //timerElapsed.current =  Date.now()
    let interval;
    if (!isPaused) {
      launchTimestamp.current = Date.now()
      interval = setTimeout(() => {
        if (!disableTimer.current) {
          const newIndex =
            typeof activeIndexState !== "undefined" ? (activeIndexState + 1) % slidesLength : 0;
          if (restartAfterEnd || newIndex !== 0) {
            scrollToIndex(newIndex);
          } else {
            onOverflow && onOverflow("end", true);
          }
        }
      }, timeRemaining.current || autoDelay);
      timeRemaining.current = timeRemaining.current || autoDelay;
    } else {
      timeRemaining.current = timeRemaining.current - (Date.now() - launchTimestamp.current)
    }

    return () => {
      console.log("clear", isPaused, launchTimestamp, Date.now() - launchTimestamp);
      console.log("remaining", isPaused, launchTimestamp.current);

      return clearTimeout(interval);
    };
  }, [
    resetTimer,
    slidesLength,
    scrollToIndex,
    onChange,
    autoDelay,
    activeIndexState,
    onOverflow,
    restartAfterEnd,
    isPaused
  ]);

  return (
    <PressableFlex flex={1} width="100%" alignItems="center" justifyContent="center" onLongPress={() => console.log('onLongPress')} {...containerProps}>
      <HorizontalScrollView
        ref={scrollRef}
        onScroll={onScroll}
        onContentSizeChange={onContentSizeChange}
        onScrollBeginDrag={() => {
          disableTimer.current = true;
        }}
        onScrollEndDrag={() => {
          disableTimer.current = false;
        }}
        pagingEnabled={Platform.OS !== "web"}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        contentContainerStyle={{ width: `${fullWidth}%` }}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        onTouchEnd={scrollOnSidePress ? onTap : undefined}
        {...scrollViewProps}
      >
        {React.Children.map(children, (child, index) => (
          <Flex key={index} flex={1}>
            {child}
          </Flex>
        ))}
      </HorizontalScrollView>
      <Flex my={8} {...slideIndicatorContainerProps}>
        {React.isValidElement(IndicatorComponent) ? (
          IndicatorComponent
        ) : (
          <IndicatorComponent
            activeIndex={activeIndexState || 0}
            onChange={(index: number) => {
              scrollToIndex(index);
            }}
            slidesLength={slidesLength}
            duration={autoDelay}
          />
        )}
      </Flex>
    </PressableFlex>
  );
}

export default React.memo(Carousel);
