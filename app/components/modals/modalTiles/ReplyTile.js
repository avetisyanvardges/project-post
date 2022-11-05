import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "../../svgIcons/Icon";
import PropTypes from "prop-types";
//Components
import Reply from "./tileComponents/Reply";
//Theme
import { colors, theme } from "../../../config/theme";
//Queries
import { useQuery, useMutation } from "@apollo/client";
import { COMMENT } from "../../../services/graphql/postQueries";
import {
  ADD_POST_COMMENT_LIKE,
  DELETE_POST_COMMENT_LIKE,
} from "../../../services/graphql/postMutations";

const ListItemDeleteAction = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.deleteContainer}>
        <Icon name="trash" size={25} fill={colors.white} />
      </View>
    </TouchableWithoutFeedback>
  );
};

function ReplyTile({
  replyId,
  authUserId,
  handleDelete,
  onPressReply,
  onProfilePress,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [lastPress, setLastPress] = useState(0);
  const timeout = useRef();

  const replyData = useQuery(COMMENT, {
    variables: {
      authUserId: authUserId,
      postCommentId: replyId,
    },
  });

  if (replyData.error) {
    console.log(
      "Reply Query " + replyData.error + " (Comment Id: " + replyId + ")"
    );
  }

  useEffect(() => {
    if (replyData.data) {
      setIsLiked(replyData.data.comment.isLiked);
    }
    return;
  }, [replyData.data]);

  const [addPostCommentLike] = useMutation(ADD_POST_COMMENT_LIKE, {
    onError(error) {
      console.log("Like Reply Failed: " + error);
    },
    update(cache, { data }) {
      const commentQuery = cache.readQuery({
        query: COMMENT,
        variables: {
          postCommentId: replyId,
          authUserId: authUserId,
        },
      });

      cache.writeQuery({
        query: COMMENT,
        variables: { postCommentId: replyId, authUserId: authUserId },
        data: {
          comment: {
            ...commentQuery.comment,
            isLiked: true,
            commentLikesAggregate: {
              aggregate: {
                count:
                  data.addPostCommentLike.postCommentLikesAggregate.aggregate
                    .count,
              },
            },
          },
        },
      });
    },
  });

  const [deletePostCommentLike] = useMutation(DELETE_POST_COMMENT_LIKE, {
    onError(error) {
      console.log("UnLike Reply Failed: " + error);
    },
    update(cache, { data }) {
      const commentQuery = cache.readQuery({
        query: COMMENT,
        variables: {
          postCommentId: replyId,
          authUserId: authUserId,
        },
      });

      cache.writeQuery({
        query: COMMENT,
        variables: { postCommentId: replyId, authUserId: authUserId },
        data: {
          comment: {
            ...commentQuery.comment,
            isLiked: false,
            commentLikesAggregate: {
              aggregate: {
                count:
                  data.deletePostCommentLike.postCommentLikesAggregate.aggregate
                    .count,
              },
            },
          },
        },
      });
    },
  });

  const onManualPress = async () => {
    const time = new Date().getTime();
    const delta = time - lastPress;
    const DOUBLE_PRESS_DELAY = 300;
    //Double Tap Event
    if (delta < DOUBLE_PRESS_DELAY) {
      handleLike();
      setLastPress(time);
      clearTimeout(timeout.current);
    }
    //Single Tap Event
    else {
      timeout.current = setTimeout(() => {}, DOUBLE_PRESS_DELAY);
      setLastPress(time);
    }
  };

  const handleLike = () => {
    // API CALL
    setIsLiked((prevLike) => !prevLike);
    if (isLiked == true) {
      deletePostCommentLike({
        variables: {
          userId: authUserId,
          postCommentId: replyId,
        },
      });
    } else {
      addPostCommentLike({
        variables: {
          userId: authUserId,
          postCommentId: replyId,
        },
      });
    }
  };

  return !replyData.loading && !replyData.error ? (
    <Swipeable
      renderRightActions={() => (
        <ListItemDeleteAction
          onPress={() => handleDelete(replyData.data.comment.postCommentId)}
        />
      )}
      enabled={replyData.data.comment.user.userId == authUserId ? true : false}
    >
      <TouchableWithoutFeedback onPress={onManualPress}>
        <View style={styles.container}>
          <Reply
            userId={replyData.data.comment.user.userId}
            authUserId={authUserId}
            commentId={replyData.data.comment.postCommentId}
            handleLike={handleLike}
            numberOfLikes={
              replyData.data.comment.commentLikesAggregate.aggregate.count
            }
            isLiked={isLiked}
            comment={replyData.data.comment.comment}
            timeAgo={replyData.data.comment.dateCreated}
            onPressReply={onPressReply}
            onProfilePress={onProfilePress}
            hashtags={replyData.data.comment.hashtags}
            mentions={replyData.data.comment.mentions}
          />
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 55,
    paddingVertical: 10,
  },
  deleteContainer: {
    backgroundColor: theme.modal.warningColor,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

ReplyTile.propTypes = {
  authUserId: PropTypes.number,
  handleDelete: PropTypes.func,
  replyId: PropTypes.number,
};

export default ReplyTile;
