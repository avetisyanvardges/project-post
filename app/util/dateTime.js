import moment from "moment";
import { DATE_TIME_FORMAT } from "../config/constants";

const secondOfMinute = 60;
const secondOfHour = secondOfMinute * 60;
const secondOfDay = secondOfHour * 24;
const secondOfWeek = secondOfDay * 7;

export const diffTimeSecond = (timeA, timeB) => {
  if (!timeA || !timeB) {
    return 0;
  }
  const timeStampA = moment(timeA).unix();
  const timeStampB = moment(timeB).unix();
  return Math.abs(timeStampB - timeStampA);
};

export const formatDateTimeMessage = (messageTime) => {
  if (!messageTime) {
    return null;
  }
  const diff = diffTimeSecond(messageTime, moment().utc());

  if (diff >= secondOfWeek) {
    return moment(messageTime).format(DATE_TIME_FORMAT.monthDayTime);
  }
  if (diff >= secondOfDay) {
    return moment(messageTime).format(DATE_TIME_FORMAT.timeDateOfWeek);
  }
  return moment(messageTime).format(DATE_TIME_FORMAT.time);
};
