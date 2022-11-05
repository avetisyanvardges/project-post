import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
//Data Displays
import Avatar from "../../../dataDisplays/Avatar";
import AppText from "../../../dataDisplays/AppText";
import TimeAgo from "../../../dataDisplays/dataMasks/TimeAgo";
//Components
import Like from "../../../inputs/icons/Like";
//Theme
import { theme } from "../../../../config/theme";
//Query
import { useQuery } from "@apollo/client";
import { USER_COMMENT } from "../../../../services/graphql/userQueries";
import CollapsibleText from "../../../dataDisplays/CollapsibleText";
import DynamicText from "../../../dataDisplays/dataMasks/DynamicText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function Reply({
  userId,
  authUserId,
  commentId,
  handleLike,
  numberOfLikes,
  numberOfReplies,
  isLiked,
  isReplyVisible,
  comment,
  timeAgo,
  onPressCollapseReplies,
  onPressViewReplies,
  onPressReply,
  onProfilePress,
  hashtags,
  mentions,
}) {
  const userData = useQuery(USER_COMMENT, {
    variables: {
      recipientUserId: userId,
      authUserId: authUserId,
    },
  });

  if (userData.error) {
    console.log("User Query " + userData.error + " (User Id: " + userId + ")");
  }

  return !userData.loading && !userData.error ? (
    <View style={styles.container}>
      <View style={{ height: "100%" }}>
        <TouchableWithoutFeedback onPress={() => onProfilePress(userId)}>
          <Avatar
            style={
              userData.data.user.featuredVideo
                ? { borderWidth: 1, borderColor: theme.modal.themeBlue }
                : null
            }
            size="xs"
            image={userData.data.user.avatar}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginBottom: 5,
          }}
        >
          <View style={{ flex: 1 }}>
            <AppText style={styles.comment}>
              <AppText style={styles.username}>
                {userData.data.user.username}
                {"  "}
              </AppText>
              <CollapsibleText fontSize={12} fontWeight="700" numOfLines={3}>
                <DynamicText
                  content={comment}
                  hashtags={hashtags}
                  mentions={mentions}
                />
              </CollapsibleText>{" "}
            </AppText>
          </View>
          <View style={styles.likeContainer}>
            <Like
              handleLike={handleLike}
              isLiked={isLiked}
              hSize={18}
              tSize="sm"
              numberOfLikes={numberOfLikes}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TimeAgo style={styles.timeText} date={timeAgo} />
          <AppText
            style={[styles.linkText, { marginLeft: 10, fontSize: 14 }]}
            onPress={() => {
              onPressReply((userName = userData.data.user.username));
            }}
          >
            {"   "}Reply
          </AppText>
        </View>
        {numberOfReplies != 0 ? (
          isReplyVisible ? (
            <View style={[styles.rowContainer, { marginTop: 10 }]}>
              <View style={[styles.line, { marginRight: 10 }]} />
              <AppText
                style={[styles.linkText, { fontSize: 13 }]}
                onPress={() => onPressCollapseReplies()}
              >
                Hide Replies
              </AppText>
            </View>
          ) : (
            <View style={[styles.rowContainer, { marginTop: 10 }]}>
              <View style={[styles.line, { marginRight: 10 }]} />
              <AppText
                style={[styles.linkText, { fontSize: 13 }]}
                onPress={() => onPressViewReplies(commentId)}
              >
                View {numberOfReplies} Replies
              </AppText>
            </View>
          )
        ) : null}
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  rowContainer: {
    width: "100%",
    height: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  likeContainer: {
    width: 50,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    color: theme.modal.textColor,
    fontWeight: "500",
    fontSize: 16,
  },
  comment: {
    color: theme.modal.textColor,
    fontSize: 12,
  },
  timeText: {
    color: theme.modal.textColor,
    fontWeight: "300",
    fontSize: 13,
  },
  linkText: {
    color: theme.modal.textColor,
    fontWeight: "500",
  },
  line: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    width: 20,
  },
});

Reply.defaultProps = {
  numberOfReplies: 0,
  isLiked: false,
  isReplyVisible: false,
};

Reply.propTypes = {
  userId: PropTypes.number,
  authUserId: PropTypes.number,
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool,
  numberOfReplies: PropTypes.number,
  isReplyVisible: PropTypes.bool,
  comment: PropTypes.string,
  timeAgo: PropTypes.string,
  handleLike: PropTypes.func,
  onPressReply: PropTypes.func,
  onPressViewReplies: PropTypes.func,
  onPressCollapseReplies: PropTypes.func,
};

export default Reply;
