import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Platform } from "react-native";

export const useScrollManager = (routes, headerHeight) => {
  const viewOffset = Platform.OS === "ios" ? -headerHeight : 0;
  const scrollY = useRef(new Animated.Value(-headerHeight)).current;
  const [index, setIndex] = useState(0);
  const isListGliding = useRef(false);
  const tabkeyToScrollPosition = useRef({}).current;
  const tabkeyToScrollableChildRef = useRef({}).current;
  const scrollYPosition = useRef({}).current;

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      const curRoute = routes[index].key;
      tabkeyToScrollPosition[curRoute] = value;
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [index, scrollY, routes, tabkeyToScrollPosition]);

  return useMemo(() => {
    const syncScrollOffset = () => {
      const curRouteKey = routes[index].key;
      const scrollValue = tabkeyToScrollPosition[curRouteKey];

      Object.keys(tabkeyToScrollableChildRef).forEach((key) => {
        const scrollRef = tabkeyToScrollableChildRef[key];
        if (!scrollRef) {
          return;
        }

        if (/* header visible */ key !== curRouteKey) {
          if (scrollValue <= viewOffset + headerHeight) {
            scrollRef.scrollToOffset({
              offset: Math.max(
                Math.min(scrollValue, viewOffset + headerHeight),
                viewOffset
              ),
              animated: false,
            });
            tabkeyToScrollPosition[key] = scrollValue;
          } else if (
            /* header hidden */
            tabkeyToScrollPosition[key] < viewOffset + headerHeight ||
            tabkeyToScrollPosition[key] == null
          ) {
            scrollRef.scrollToOffset({
              offset: viewOffset + headerHeight,
              animated: false,
            });
            tabkeyToScrollPosition[key] = viewOffset + headerHeight;
          }
        }
      });
    };

    const onMomentumScrollBegin = () => {
      isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
      isListGliding.current = false;
      syncScrollOffset();
    };

    const onScrollEndDrag = () => {
      syncScrollOffset();
    };

    const trackRef = (key, ref) => {
      tabkeyToScrollableChildRef[key] = ref;
    };

    const getRefForKey = (key) => tabkeyToScrollableChildRef[key];

    return {
      scrollY,

      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollEndDrag,
      trackRef,
      index,
      setIndex,
      getRefForKey,
    };
  }, [
    index,
    routes,
    scrollY,
    tabkeyToScrollPosition,
    tabkeyToScrollableChildRef,
  ]);
};
