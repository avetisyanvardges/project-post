import React, { memo } from "react";
import { Animated, View, Dimensions, StyleSheet } from "react-native";

import SavableDetailedCard from "../cards/postItemCards/SavableDetailedCard";

const PostCarouselWithoutMemo = ({ data, initialNumToRender }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  let { width } = Dimensions.get("window");

  let itemWidth = width / 2.2;

  const _renderItems = ({ item }) => {
    return (
      <SavableDetailedCard
        thumbnail={item.thumbnail}
        avatar={item.avatar}
        name={item.name}
        price={item.price}
        rating={item.rating}
      />
    );
  };

  return (
    <View>
      <Animated.FlatList
        data={data}
        renderItem={_renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={initialNumToRender}
        snapToInterval={itemWidth}
        decelerationRate={0}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   {
        //     useNativeDriver: false,
        //   }
        // )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
  },
});

const PostCarousel = memo(PostCarouselWithoutMemo);

export default PostCarousel;
