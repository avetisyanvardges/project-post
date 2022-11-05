import { gql } from "@apollo/client";

export const ADD_POST_LIKE = gql`
  mutation ($postId: BigInt, $userId: BigInt) {
    addPostLike(postId: $postId, userId: $userId) {
      message
      postLikesAggregate {
        aggregate {
          count
        }
      }
      postId
      userId
    }
  }
`;

export const DELETE_POST_LIKE = gql`
  mutation ($postId: BigInt, $userId: BigInt) {
    deletePostLike(postId: $postId, userId: $userId) {
      message
      postLikesAggregate {
        aggregate {
          count
        }
      }
      postId
      userId
    }
  }
`;

export const ADD_POST_SAVE = gql`
  mutation ($postId: BigInt, $userId: BigInt) {
    addPostSave(postId: $postId, userId: $userId) {
      message
      postSavesAggregate {
        aggregate {
          count
        }
      }
      postId
      userId
    }
  }
`;

export const DELETE_POST_SAVE = gql`
  mutation ($postId: BigInt, $userId: BigInt) {
    deletePostSave(postId: $postId, userId: $userId) {
      message
      postSavesAggregate {
        aggregate {
          count
        }
      }
      postId
      userId
    }
  }
`;

export const ADD_POST_COMMENT = gql`
  mutation (
    $userId: BigInt
    $postId: BigInt
    $comment: String
    $repliedCommentId: BigInt
  ) {
    addPostComment(
      userId: $userId
      postId: $postId
      comment: $comment
      repliedCommentId: $repliedCommentId
    ) {
      message
      postId
      userId
      comment
      hashtags {
        tagid
        hashtag
      }
      mentions {
        userid
        username
      }
      postCommentId
      repliedCommentId
      postCommentsAggregate {
        aggregate {
          count
        }
      }
      postCommentRepliesAggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const UPDATE_POST_COMMENT = gql`
  mutation ($postCommentId: Int, $comment: String) {
    updatePostComment(postCommentId: $postCommentId, comment: $comment) {
      message
      comment
      postCommentId
      postCommentsAggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const DELETE_POST_COMMENT = gql`
  mutation ($postCommentId: BigInt) {
    deletePostComment(postCommentId: $postCommentId) {
      message
      postCommentId
      repliedCommentId
      postCommentsAggregate {
        aggregate {
          count
        }
      }
      postCommentRepliesAggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const ADD_POST_COMMENT_LIKE = gql`
  mutation ($postCommentId: BigInt, $userId: BigInt) {
    addPostCommentLike(postCommentId: $postCommentId, userId: $userId) {
      message
      postCommentId
      userId
      postCommentLikesAggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const DELETE_POST_COMMENT_LIKE = gql`
  mutation ($postCommentId: BigInt, $userId: BigInt) {
    deletePostCommentLike(postCommentId: $postCommentId, userId: $userId) {
      message
      postCommentId
      userId
      postCommentLikesAggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
