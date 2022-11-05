import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../../config/theme.js";
import AppText from "../../dataDisplays/AppText.js";

function AccordionTile({
  title,
  content,
  tileColor,
  headerStyle,
  contentStyle,
  headerTextStyle,
  contentTextStyle,
}) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  return (
    <View style={[styles.itemContainer]}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={toggleExpanded}>
          <View style={headerStyle}>
            <AppText style={headerTextStyle}>{title}</AppText>
          </View>
        </TouchableWithoutFeedback>
        <Collapsible collapsed={collapsed} align="center">
          <View style={contentStyle}>
            <AppText style={contentTextStyle}>{content}</AppText>
          </View>
        </Collapsible>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingVertical: 8,
    width: "100%",
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: colors.lightCharcoal,
  },
});

AccordionTile.defaultProps = {
  headerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: "row",
  },
  contentStyle: { paddingVertical: 20, paddingHorizontal: 20 },
  headerTextStyle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
  },
  contentTextStyle: { color: colors.white, fontSize: 14, fontWeight: "500" },
};

export default AccordionTile;
