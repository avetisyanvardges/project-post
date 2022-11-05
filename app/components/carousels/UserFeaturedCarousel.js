import React, { memo } from "react";
import { FlatList, View, Dimensions } from "react-native";
import { UserFeaturedCard } from "../cards";

const UserFeaturedCarouselWithoutMemo = ({ data, initialNumToRender }) => {
  let { width } = Dimensions.get("window");

  const _renderItems = ({ item }) => {
    return (
      <UserFeaturedCard
        image={item.thumbnail}
        avatar={item.avatar}
        username={item.username}
        level={item.level}
        tags={item.tags}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={_renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={initialNumToRender}
        snapToInterval={width}
        decelerationRate={0}
      />
    </View>
  );
};

const UserFeaturedCarousel = memo(UserFeaturedCarouselWithoutMemo);

export default UserFeaturedCarousel;
