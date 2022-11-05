import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "../../svgIcons/Icon";
import PropTypes from "prop-types";
//Global Context
import { AuthContext } from "../../../config/context";
//Components
import ReplyTile from "./ReplyTile";
import Comment from "./tileComponents/Comment";
//Theme
import { colors, theme } from "../../../config/theme";
//DataDisplays
import AppText from "../../dataDisplays/AppText";
//Queries
import { useQuery, useMutation } from "@apollo/client";
import { COMMENT, POST } from "../../../services/graphql/postQueries";
import {
  ADD_POST_COMMENT,
  ADD_POST_COMMENT_LIKE,
  DELETE_POST_COMMENT,
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

CommentTile = React.forwardRef(
  (
    {
      commentId,
      postId,
      handleCommentDelete,
      onPressCollapseReplies,
      onPressViewReplies,
      onPressReply,
      onProfilePress,
      setIsErrorVisible,
      setLoadingMutation,
      setText,
      setIsReplyVisible_Global,
    },
    ref
  ) => {
    //Global Context: User Id
    const authUserId = useContext(AuthContext);
    const flatListRef = useRef();
    const timeout = useRef();
    const [lastPress, setLastPress] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isReplyVisible, setIsReplyVisible] = useState(false); //Local State for Reply's visibility

    React.useImperativeHandle(ref, () => ({
      addCommentReply,
    }));

    const commentData = useQuery(COMMENT, {
      variables: {
        postCommentId: commentId,
        authUserId: authUserId,
      },
    });

    if (commentData.error) {
      console.log(
        "Comment Query " +
          commentData.error +
          " (Comment Id: " +
          commentId +
          ")"
      );
    }

    useEffect(() => {
      if (commentData.data) {
        setIsLiked(commentData.data.comment.isLiked);
      }
      return;
    }, [commentData.data]);

    const [addPostCommentReply] = useMutation(ADD_POST_COMMENT, {
      onError(error) {
        setIsErrorVisible(true);
        setLoadingMutation(false);
        setText("");
        console.log("Add Comment Failed: " + error);
      },

      update(cache, { data }) {
        const newCommentAggregate =
          data?.addPostComment.postCommentsAggregate.aggregate.count;

        const newReplyAggregate =
          data?.addPostComment.postCommentRepliesAggregate.aggregate.count;

        const postQuery = cache.readQuery({
          query: POST,
          variables: { userId: authUserId, postId: postId },
        });

        if (postQuery && newCommentAggregate) {
          cache.writeQuery({
            query: POST,
            variables: { userId: authUserId, postId: postId },
            data: {
              post: {
                ...postQuery.post,
                postCommentsAggregate: {
                  aggregate: {
                    count: newCommentAggregate,
                  },
                },
              },
            },
          });
        }

        const repliedCommentId = data?.addPostComment.repliedCommentId; //Parent of Deleted Comment
        const postCommentId = data?.addPostComment.postCommentId; //New Comment Reply

        const commentData = cache.readQuery({
          query: COMMENT,
          variables: {
            authUserId: authUserId,
            postCommentId: repliedCommentId,
          },
        });

        let newReplyListQuery = [];

        commentData.comment.commentReplies == null
          ? (newReplyListQuery = [
              {
                __typename: "PostCommentReplyType",
                postCommentId: postCommentId,
              },
            ])
          : (newReplyListQuery = [
              ...commentData.comment.commentReplies,
              {
                __typename: "PostCommentReplyType",
                postCommentId: postCommentId,
              },
            ]);

        cache.writeQuery({
          query: COMMENT,
          variables: {
            authUserId: authUserId,
            postCommentId: repliedCommentId,
          },
          data: {
            comment: {
              ...commentData.comment,
              commentReplies: newReplyListQuery,
              commentRepliesAggregate: {
                aggregate: {
                  count: newReplyAggregate,
                },
              },
            },
          },
        });
      },
      onCompleted() {
        setLoadingMutation(false);
        setText(null);
        setIsReplyVisible(true);
      },
    });

    const [deletePostCommentReply] = useMutation(DELETE_POST_COMMENT, {
      onError(error) {
        setIsErrorVisible(true);
        setLoadingMutation(false);
        setText("");
        console.log("Delete Comment Failed: " + error);
      },

      update(cache, { data }) {
        const postQuery = cache.readQuery({
          query: POST,
          variables: { userId: authUserId, postId: postId },
        });

        const newCommentAggregate =
          data?.deletePostComment.postCommentsAggregate.aggregate.count;

        cache.writeQuery({
          query: POST,
          variables: { userId: authUserId, postId: postId },
          data: {
            post: {
              ...postQuery.post,
              postCommentsAggregate: {
                aggregate: {
                  count: newCommentAggregate,
                },
              },
            },
          },
        });

        const repliedCommentId = data?.deletePostComment.repliedCommentId; //Parent of Deleted Comment
        const postCommentId = data?.deletePostComment.postCommentId; //Deleted Comment

        const commentData = cache.readQuery({
          query: COMMENT,
          variables: {
            authUserId: authUserId,
            postCommentId: repliedCommentId,
          },
        });

        const newReplyListQuery = commentData.comment.commentReplies.filter(
          (t) => t?.postCommentId !== postCommentId
        );

        const newReplyAggregate =
          data?.deletePostComment.postCommentRepliesAggregate.aggregate.count;

        cache.writeQuery({
          query: COMMENT,
          variables: {
            authUserId: authUserId,
            postCommentId: repliedCommentId,
          },
          data: {
            comment: {
              ...commentData.comment,
              commentReplies: newReplyListQuery,
              commentRepliesAggregate: {
                aggregate: {
                  count: newReplyAggregate,
                },
              },
            },
          },
        });
      },
      onCompleted(data) {
        setLoadingMutation(false);
        try {
          if (
            data?.deletePostComment.postCommentRepliesAggregate.aggregate
              .count == 0
          ) {
            setIsReplyVisible_Global(false);
            setIsReplyVisible(false);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

    const [addPostCommentLike] = useMutation(ADD_POST_COMMENT_LIKE, {
      onError(error) {
        console.log("Like Comment Failed: " + error);
      },
      update(cache, { data }) {
        const commentQuery = cache.readQuery({
          query: COMMENT,
          variables: {
            postCommentId: commentId,
            authUserId: authUserId,
          },
        });

        cache.writeQuery({
          query: COMMENT,
          variables: { postCommentId: commentId, authUserId: authUserId },
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
        console.log("Unlike Comment Failed: " + error);
      },
      update(cache, { data }) {
        const commentQuery = cache.readQuery({
          query: COMMENT,
          variables: {
            postCommentId: commentId,
            authUserId: authUserId,
          },
        });

        cache.writeQuery({
          query: COMMENT,
          variables: { postCommentId: commentId, authUserId: authUserId },
          data: {
            comment: {
              ...commentQuery.comment,
              isLiked: false,
              commentLikesAggregate: {
                aggregate: {
                  count:
                    data.deletePostCommentLike.postCommentLikesAggregate
                      .aggregate.count,
                },
              },
            },
          },
        });
      },
    });

    const addCommentReply = (text) => {
      addPostCommentReply({
        variables: {
          userId: authUserId,
          postId: postId,
          comment: text,
          repliedCommentId: commentId,
        },
      });
      setLoadingMutation(true);
    };

    const deleteCommentReply = (postCommentId) => {
      deletePostCommentReply({
        variables: {
          postCommentId: postCommentId,
        },
      });
      setLoadingMutation(true);
    };

    const handleLike = () => {
      // API CALL
      setIsLiked((prevLike) => !prevLike);
      if (isLiked == true) {
        deletePostCommentLike({
          variables: {
            userId: authUserId,
            postCommentId: commentId,
          },
        });
      } else {
        addPostCommentLike({
          variables: {
            userId: authUserId,
            postCommentId: commentId,
          },
        });
      }
    };

    const onViewReplies = (postCommentId) => {
      onPressViewReplies(postCommentId);
      setIsReplyVisible(true);
    };

    const onCollapseReplies = () => {
      onPressCollapseReplies();
      setIsReplyVisible(false);
    };

    const onReply = (userName, postCommentId) => {
      if (postCommentId) {
        onPressReply(userName, postCommentId);
      } else {
        onPressReply(userName);
        setIsReplyVisible(true);
      }
    };

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

    const _renderItem = useCallback(({ item }) => (
      <ReplyTile
        replyId={item.postCommentId}
        authUserId={authUserId}
        handleDelete={deleteCommentReply}
        onPressReply={onReply}
        onProfilePress={onProfilePress}
      />
    ));

    return !commentData.loading && !commentData.error ? (
      <>
        <Swipeable
          renderRightActions={() => (
            <ListItemDeleteAction
              onPress={() =>
                handleCommentDelete(commentData.data.comment.postCommentId)
              }
            />
          )}
          enabled={
            commentData.data.comment.user.userId == authUserId ? true : false
          }
        >
          <TouchableWithoutFeedback onPress={onManualPress}>
            <View style={styles.container}>
              <Comment
                userId={commentData.data.comment.user.userId}
                authUserId={authUserId}
                commentId={commentData.data.comment.postCommentId}
                numberOfLikes={
                  commentData.data.comment.commentLikesAggregate.aggregate.count
                }
                numberOfReplies={
                  commentData.data.comment.commentRepliesAggregate.aggregate
                    .count
                }
                isLiked={isLiked}
                isReplyVisible={isReplyVisible}
                comment={commentData.data.comment.comment}
                timeAgo={commentData.data.comment.createdOn}
                handleLike={handleLike}
                onPressCollapseReplies={onCollapseReplies}
                onPressViewReplies={onViewReplies}
                onPressReply={onReply}
                onProfilePress={onProfilePress}
                mentions={commentData.data.comment.mentions}
                hashtags={commentData.data.comment.hashtags}
              />
            </View>
          </TouchableWithoutFeedback>
        </Swipeable>
        {isReplyVisible ? (
          <FlatList
            ref={flatListRef}
            data={commentData.data.comment.commentReplies}
            nestedScrollEnabled={true}
            ListFooterComponent={() => {
              return commentData.data.comment.commentReplies.length > 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20,
                    flexDirection: "row",
                    //opacity: 0.5,
                  }}
                >
                  <View style={[styles.line, { marginRight: 10 }]} />
                  <AppText
                    style={{ color: theme.modal.subTextColor }}
                    onPress={() => onCollapseReplies()}
                  >
                    Hide Replies
                  </AppText>
                  <View style={[styles.line, { marginLeft: 10 }]} />
                </View>
              ) : (
                <View />
              );
            }}
            keyExtractor={(item) => item.postCommentId.toString()}
            renderItem={_renderItem}
            //onEndReached={this.endReached}
            //onEndReachedThreshold={.7}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  flex: 1,
                  paddingLeft: 55,
                  paddingRight: 25,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    opacity: 0.5,
                    backgroundColor: theme.modal.separatorColor,
                  }}
                />
              </View>
            )}
          />
        ) : null}
      </>
    ) : null;
  }
);

const styles = StyleSheet.create({
  container: {
    //Entire Comment Container
    paddingLeft: 10,
    paddingVertical: 10,
  },
  deleteContainer: {
    backgroundColor: theme.modal.warningColor,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    width: 20,
  },
});

CommentTile.propTypes = {
  handleDelete: PropTypes.func,
  onPressCollapseReplies: PropTypes.func,
  onPressViewReplies: PropTypes.func,
  onPressReply: PropTypes.func,
};

export default React.memo(CommentTile);
