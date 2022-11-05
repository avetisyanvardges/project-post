import React from "react";
import { Text } from "react-native";

import PropTypes from "prop-types";
import AppText from "../AppText";
import moment from "moment";

function TimeAgo({ date, style }) {
  const timeAgo = moment(date).fromNow();
  return <AppText style={style}>{timeAgo}</AppText>;
}

TimeAgo.propTypes = {};

export default TimeAgo;
