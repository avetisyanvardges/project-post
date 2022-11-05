import {gql} from '@apollo/client';

// export const POST = gql`
//   query post($postId: Int, $userId: Int) {
//     post(postId: $postId, userId: $userId) {
//       postId
//       thumbnail
//       media
//       venueId
//       title
//       userRating
//       isVerifiedBooking
//       isLiked
//       isSaved
//       postLikesAggregate {
//         aggregate {
//           count
//         }
//       }
//       postCommentsAggregate {
//         aggregate {
//           count
//         }
//       }
//       postSharesAggregate {
//         aggregate {
//           count
//         }
//       }
//       postSavesAggregate {
//         aggregate {
//           count
//         }
//       }
//       userId
//       description
//       hashtags {
//         tagid
//         hashtag
//       }
//       mentions {
//         userid
//         username
//       }
//       createdOn
//     }
//   }
// `;

export const POST = gql`
  query ($postId: Int, $userId: Int) {
    post(postId: $postId, userId: $userId) {
      postId
      thumbnail
      media
      venueId
      title
      userRating
      isVerifiedBooking
      isLiked
      isSaved
      postLikesAggregate {
        aggregate {
          count
        }
      }
      postCommentsAggregate {
        aggregate {
          count
        }
      }
      postSharesAggregate {
        aggregate {
          count
        }
      }
      postSavesAggregate {
        aggregate {
          count
        }
      }
      userId
      postDescription
      hashtags {
        tagid
        hashtag
      }
      mentions {
        userid
        username
      }
      createdOn
    }
  }
`;

export const GET_POST = gql`
  query ($postId: Int, $userId: Int) {
    post(postId: $postId, userId: $userId) {
      postId
      thumbnail
      media
      venueId
      title
      userRating
      isVerifiedBooking
      isLiked
      isSaved
      postLikesAggregate {
        aggregate {
          count
        }
      }
      postCommentsAggregate {
        aggregate {
          count
        }
      }
      postSharesAggregate {
        aggregate {
          count
        }
      }
      postSavesAggregate {
        aggregate {
          count
        }
      }
      userId
      postDescription
      hashtags {
        tagid
        hashtag
      }
      mentions {
        userid
        username
      }
      createdOn
    }
  }
`;

export const POST_THUMBNAIL = gql`
  query postThumbnail($postId: Int, $userId: Int) {
    post(postId: $postId, userId: $userId) {
      postId
      thumbnail
    }
  }
`;

export const USER_POSTS = gql`
  query ($userId: Int, $page: Int, $limit: Int) {
    userPosts(userId: $userId, page: $page, limit: $limit) {
      posts {
        postId
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const SAVED_POSTS = gql`
  query savedPosts($userId: Int, $page: Int, $limit: Int) {
    savedPosts(userId: $userId, page: $page, limit: $limit) {
      posts {
        postId
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const GET_POSTS_BY_VENUE_ID = gql`
  query (
    $userId: Int
    $venueId: String
    $isExternal: Boolean
    $page: Int
    $limit: Int
  ) {
    venuePosts(
      userId: $userId
      venueId: $venueId
      isExternal: $isExternal
      page: $page
      limit: $limit
    ) {
      venue {
        venueId
      }
      posts {
        postId
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const GET_POSTS_BY_TAG_ID = gql`
  query ($userId: Int, $tagId: Int, $page: Int, $limit: Int) {
    tagPosts(userId: $userId, tagId: $tagId, page: $page, limit: $limit) {
      tagId
      hashtag
      posts {
        postId
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const POST_COMMENTS = gql`
  query ($postId: Int) {
    postComments(postId: $postId) {
      postCommentId
    }
  }
`;

export const COMMENT = gql`
  query ($postCommentId: Int, $authUserId: Int) {
    comment(postCommentId: $postCommentId, authUserId: $authUserId) {
      postCommentId
      isReply
      user {
        userId
      }
      comment
      createdOn
      commentLikesAggregate {
        aggregate {
          count
        }
      }
      commentRepliesAggregate {
        aggregate {
          count
        }
      }
      commentReplies {
        postCommentId
      }
      hashtags {
        tagid
        hashtag
      }
      mentions {
        userid
        username
      }
      isLiked
    }
  }
`;
