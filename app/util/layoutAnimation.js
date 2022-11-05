import { LayoutAnimation, Platform } from "react-native";

export const layoutAnimationOpacity = () => {
  if (Platform.OS === "android") {
    return null;
  }
  return LayoutAnimation.configureNext(
    LayoutAnimation.create(
      300,
      LayoutAnimation.Types.opacity,
      LayoutAnimation.Properties.scaleXY
    )
  );
};
