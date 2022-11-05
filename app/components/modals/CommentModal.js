import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
//Global Context
import {AuthContext} from '../../config/context';
//Data Displays
import Avatar from '../dataDisplays/Avatar';
import AppText from '../dataDisplays/AppText';
import Numbers from '../dataDisplays/dataMasks/Numbers';
//Components
import CommentTile from './modalTiles/CommentTile';
//Theme Constants
import {theme} from '../../config/theme';
//Animation
import ErrorAnimation from '../animations/ErrorAnimation';
//Queries
import {useQuery, useMutation, useLazyQuery} from '@apollo/client';
import {POST_COMMENTS, POST} from '../../services/graphql/postQueries';
import {
  ADD_POST_COMMENT,
  DELETE_POST_COMMENT,
} from '../../services/graphql/postMutations';
import {USER} from '../../services/graphql/userQueries';
function CommentModal({
  postId,
  isCommentVisible,
  setIsCommentVisible,
  numberOfComments,
  onNavigationProfile,
}) {
  //Global Context: User Id
  const authUserId = useContext(AuthContext);
  const flatListRef = useRef();
  const cellRefs = useRef({});
  const inputRef = useRef(null);

  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [text, setText] = useState(''); //Used to set text value for reply and comment submit
  const [commentId, setCommentId] = useState(null); //Used to set Id value for reply
  const [isReplyVisible_Global, setIsReplyVisible_Global] = useState(false); //Used to distinguish whether to incorporate Reply or Comment Logic on submit
  const [loadingMutation, setLoadingMutation] = useState(false); //Used to generate a loading icon for mutation processes
  const insets = useSafeAreaInsets();
  const flexAboveModal = 1;
  const flexOfModal = 2;

  // const [loadThreadQuery] = useLazyQuery(POST_COMMENTS);
  // const [loadUserQuery] = useLazyQuery(USER);

  const [userAvatar, setUserAvatar] = useState(''); //Implemented in case there is an issue with the userQuery

  //Queries
  const commentQueryList = useQuery(POST_COMMENTS, {
    variables: {
      postId: postId,
    },
  });

  // const loadThread = () => {
  //   loadThreadQuery({
  //     variables: {postId: postId},
  //   });
  // };

  const userQuery = useQuery(USER, {
    variables: {
      recipientUserId: authUserId,
      authUserId: authUserId,
    },
  });

  //Query Errors
  if (commentQueryList.error) {
    'Comment List Query ' +
      commentQueryList.error +
      ' (Post Id: ' +
      postId +
      ')';
  }

  if (userQuery.error) {
    'User Query ' + userQuery.error + ' (User Id: ' + authUserId + ')';
  }

  useEffect(() => {
    console.log('comment modal');
    if (userQuery.data) {
      setUserAvatar(userQuery.data.user.avatar);
    }
  }, [userQuery.data]);

  //Mutations & Apollo Cache Update
  const [addPostComment] = useMutation(ADD_POST_COMMENT, {
    onError(error) {
      setIsErrorVisible(true);
      setLoadingMutation(false);
      setText('');
      console.log('Add Comment Failed: ' + error);
    },

    update(cache, {data}) {
      const postQuery = cache.readQuery({
        query: POST,
        variables: {userId: authUserId, postId: postId},
      });

      const newCommentAggregate =
        data?.addPostComment.postCommentsAggregate.aggregate.count;

      if (postQuery && newCommentAggregate) {
        cache.writeQuery({
          query: POST,
          variables: {userId: authUserId, postId: postId},
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

      const commentListQuery = cache.readQuery({
        query: POST_COMMENTS,
        variables: {postId: postId},
      });

      const postCommentId = data?.addPostComment.postCommentId;

      const newCommentListQuery = [
        {
          __typename: 'PostCommentListType',
          postCommentId: postCommentId,
        },
        ...commentListQuery.postComments,
      ];

      if (commentListQuery && newCommentListQuery) {
        cache.writeQuery({
          query: POST_COMMENTS,
          variables: {postId: postId},
          data: {
            postComments: newCommentListQuery,
          },
        });
      }
    },
    onCompleted(data) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
      setLoadingMutation(false);
      setText(null);
    },
  });

  const [deletePostComment] = useMutation(DELETE_POST_COMMENT, {
    onError(error) {
      setIsErrorVisible(true);
      setLoadingMutation(false);
      setText('');
      console.log('Delete Comment Failed: ' + error);
    },

    update(cache, {data}) {
      const postQuery = cache.readQuery({
        query: POST,
        variables: {userId: authUserId, postId: postId},
      });

      const newCommentAggregate =
        data?.deletePostComment.postCommentsAggregate.aggregate.count;

      if (postQuery && newCommentAggregate) {
        cache.writeQuery({
          query: POST,
          variables: {userId: authUserId, postId: postId},
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

      const commentListQuery = cache.readQuery({
        query: POST_COMMENTS,
        variables: {postId: postId},
      });

      const deletedCommentId = data?.deletePostComment.postCommentId;

      const newCommentListQuery = commentListQuery.postComments.filter(
        t => t?.postCommentId !== deletedCommentId,
      );

      cache.writeQuery({
        query: POST_COMMENTS,
        variables: {postId: postId},
        data: {
          postComments: newCommentListQuery,
        },
      });

      cache.evict({commentId: deletedCommentId});
    },
    onCompleted(data) {
      setLoadingMutation(false);
    },
  });

  const handleCommentSubmit = () => {
    setLoadingMutation(true);
    addPostComment({
      variables: {
        userId: authUserId,
        postId: postId,
        comment: text,
        repliedCommentId: null,
      },
    });
  };

  const handleCommentDelete = postCommentId => {
    setLoadingMutation(true);
    deletePostComment({
      variables: {
        postCommentId: postCommentId,
      },
    });
  };

  const handleReplySubmit = () => {
    if (cellRefs.current[commentId]) {
      cellRefs.current[commentId].addCommentReply(text);
    }
  };

  const onViewReplies = postCommentId => {
    setIsReplyVisible_Global(true);
    setCommentId(postCommentId);
  };

  const onCollapseReplies = () => {
    setIsReplyVisible_Global(false);
    setText(null);
  };

  const onPressReply = (userName, postCommentId) => {
    if (postCommentId) {
      setIsReplyVisible_Global(true);
      setCommentId(postCommentId);
    }
    prependText(userName);
    inputRef.current.focus();
  };

  const prependText = t => {
    if (t) {
      t ? setText('@' + t + ' ') : setText(null);
    }
  };

  const onProfilePress = userId => {
    setIsCommentVisible(false);
    onNavigationProfile(userId);
  };

  return !commentQueryList.loading && !commentQueryList.error ? (
    <Modal animationType="slide" transparent={true} visible={isCommentVisible}>
      <View style={{flex: 1}}>
        {/* Touchable Space above Comment Modal to close Modal */}
        <TouchableWithoutFeedback
          onPress={() => setIsCommentVisible(!isCommentVisible)}>
          <View style={{flex: flexAboveModal}} />
        </TouchableWithoutFeedback>

        {/* Comment Modal: Seperated by Header and Flalist (comments)  */}
        <View
          style={{
            flex: flexOfModal,
            backgroundColor: theme.modal.backgroundColor,
          }}>
          <View
            style={{
              paddingBottom: 200 + insets.bottom,
            }}>
            {/* Modal Header */}
            <View style={styles.headerContainer}>
              <View style={styles.headerTitle}>
                <AppText style={styles.headerTitleText}>
                  <Numbers number={numberOfComments} /> comments{' '}
                </AppText>
              </View>
              <TouchableWithoutFeedback
                onPress={() => setIsCommentVisible(!isCommentVisible)}>
                <View style={styles.headerExit}>
                  <AppText style={styles.headerTitleText}>X</AppText>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.separator} />
            {/* Comment List */}
            <View style={{height: '100%', width: '100%'}}>
              <FlatList
                ref={flatListRef}
                data={commentQueryList.data.postComments}
                keyExtractor={item => item.postCommentId.toString()}
                renderItem={({item}) => (
                  <CommentTile
                    ref={ref => {
                      cellRefs.current[item.postCommentId] = ref;
                    }}
                    commentId={item.postCommentId}
                    postId={postId}
                    handleCommentDelete={handleCommentDelete}
                    onPressViewReplies={onViewReplies}
                    onPressCollapseReplies={onCollapseReplies}
                    onPressReply={onPressReply}
                    onProfilePress={onProfilePress}
                    setLoadingMutation={setLoadingMutation}
                    setIsReplyVisible_Global={setIsReplyVisible_Global}
                    setIsErrorVisible={setIsErrorVisible}
                    setText={setText}
                  />
                )}
                //onEndReached={this.endReached}
                //onEndReachedThreshold={.7}
              />
            </View>
          </View>
        </View>
        {isErrorVisible ? (
          <ErrorAnimation
            isVisible={isErrorVisible}
            setIsVisible={setIsErrorVisible}
          />
        ) : null}
        {/* Input Field to add Comment, Positioned at the bottom of the screen*/}
        {/* Independant from Parent Modal to allow for keyboard adjustment*/}
        <KeyboardAvoidingView behavior="position">
          <View
            style={[
              styles.commentInputContainer,
              {paddingBottom: insets.bottom},
            ]}>
            <View
              style={{
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {loadingMutation ? (
                <ActivityIndicator />
              ) : (
                <Avatar size="xs" image={userAvatar} style={styles.avatar} />
              )}
            </View>
            <View style={styles.commentInputText}>
              <TextInput
                ref={inputRef}
                style={{
                  width: '90%',
                  color: theme.modal.textColor,
                  fontSize: 15,
                  flex: 1,
                  padding: 5,
                }}
                returnKeyType="done"
                multiline={true}
                blurOnSubmit={true}
                placeholderTextColor={theme.input.placeholderColor}
                placeholder={
                  isReplyVisible_Global &&
                  commentQueryList.data.postComments.length > 0
                    ? 'Add a reply...'
                    : 'Add a comment...'
                }
                onSubmitEditing={
                  isReplyVisible_Global
                    ? handleReplySubmit
                    : handleCommentSubmit
                }
                onChangeText={value => setText(value)}
                value={text}
              />
            </View>
          </View>
          <View style={{flex: 1}} />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  ) : null;
}
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
  },
  headerExit: {
    right: 0,
    width: 50,
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {
    color: theme.modal.textColor,
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: theme.modal.separatorColor,
    opacity: 0.1,
    margin: 5,
  },
  commentInputContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: theme.modal.backgroundColor,
    paddingTop: 10,
  },
  commentInputText: {
    borderColor: theme.input.lineColor,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    padding: 6,
  },
  avatar: {
    borderWidth: 1,
    borderColor: theme.modal.themeBlue,
  },
});

CommentModal.propTypes = {
  setIsCommentVisible: PropTypes.func.isRequired,
  isCommentVisible: PropTypes.bool.isRequired,
  numberOfComments: PropTypes.number.isRequired,
  userId: PropTypes.number,
};

export default CommentModal;
