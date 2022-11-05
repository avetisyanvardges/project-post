import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, theme } from "../../../config/theme";
import AppText from "../../dataDisplays/AppText";
import Icon from "../../svgIcons/Icon";

function ReportTile({ title, reportId, selectReport }) {
  return (
    <TouchableOpacity onPress={() => selectReport(reportId)}>
      <View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 10,
            flexDirection: "row",
          }}
        >
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 }}>
            <Icon name="chevron-right" size={15} fill={colors.white} />
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    opacity: 0.1,
    margin: 5,
  },
  title: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: theme.modal.textColor,
  },
});

export default ReportTile;
