import React, { memo } from "react";
import { Animated, Platform } from "react-native";
import { theme } from "../../config/theme";

const AnimatedTabViewWithoutMemo = ({
  data,
  headerHeight,
  renderItem,
  getItemLayout,
  onContentSizeChange,
  initialNumToRender,
  maxToRenderPerBatch,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  onRef,
  scrollY,
  refreshControl,
  ListEmptyComponent,
}) => {
  const handleScroll =
    scrollY &&
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: true,
    });

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyboardShouldPersistTaps="always"
      ListEmptyComponent={ListEmptyComponent}
      getItemLayout={getItemLayout}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      ref={onRef}
      refreshControl={refreshControl}
      onContentSizeChange={onContentSizeChange}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScroll={handleScroll}
      onScrollEndDrag={onScrollEndDrag}
      contentInset={Platform.select({ ios: { top: headerHeight } })}
      contentOffset={Platform.select({
        ios: {
          x: 0,
          y: -headerHeight,
        },
      })}
      contentContainerStyle={Platform.select({
        ios: {
          flexGrow: 1,
          paddingBottom: theme.spacing.gutter,
        },
        android: {
          flexGrow: 1,
          paddingTop: headerHeight,
          paddingBottom: theme.spacing.gutter,
        },
      })}
    />
  );
};

export const AnimatedTabView = memo(AnimatedTabViewWithoutMemo);
