import { gql } from "@apollo/client";

export const GET_LIST_MESSAGE_THREADS = gql`
  query ($userId: Int, $page: Int, $limit: Int) {
    threadList(userId: $userId, page: $page, limit: $limit) {
      threads {
        threadId
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const GET_THREAD_INFO = gql`
  query threadInfo($threadId: Int, $userId: Int) {
    threadInfo(threadId: $threadId, userId: $userId) {
      threadId
      participants {
        userId
      }
      name
      hasUnreadMessage
      mostRecentMessage
      unreadCount {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_USER_AVATAR = gql`
  query ($recipientUserId: Int, $authUserId: Int) {
    user(recipientUserId: $recipientUserId, authUserId: $authUserId) {
      userId
      avatar
    }
  }
`;

export const GET_IS_FOLLOWING = gql`
  query ($recipientUserId: Int, $authUserId: Int) {
    user(recipientUserId: $recipientUserId, authUserId: $authUserId) {
      isFollowing
      userId
    }
  }
`;

export const DELETE_THREAD = gql`
  mutation ($userId: Int, $threadId: Int) {
    deleteThread(userId: $userId, threadId: $threadId) {
      userId
      threadId
      message
    }
  }
`;

export const GET_MESSAGE_DETAIL = gql`
  query ($userId: Int, $messageId: Int) {
    message(userId: $userId, messageId: $messageId) {
      messageId
      message
      read
      senderUserId
      recipientUserId {
        userId
      }
      shares {
        template {
          type
          id
          media
          title
        }
      }
      attachment {
        attachmentId
        attachmentUrl
        type {
          attachmentTypeId
          attachmentTypeName
        }
      }
      reaction {
        typeId
        userId
      }
    }
  }
`;

export const GET_FOLLOWER_AGGREGATE = gql`
  query ($userId: Int) {
    userFollowersAggregate(userId: $userId) {
      aggregate {
        count
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $authUserId: Int
    $recipientUserId: [BigInt]
    $message: String
  ) {
    sendMessage(
      authUserId: $authUserId
      recipientUserId: $recipientUserId
      message: $message
    ) {
      messageId
      threadId
      recipientUserId {
        userId
      }
      authUserId
    }
  }
`;

export const GET_MESSAGE_LIST = gql`
  query ($userId: Int, $threadId: Int, $page: Int, $limit: Int) {
    messageList(
      userId: $userId
      threadId: $threadId
      page: $page
      limit: $limit
    ) {
      messages {
        messageId
        createdOn
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const LIKE_MESSAGE = gql`
  mutation ($userId: Int, $messageId: Int, $reactionTypeId: Int) {
    addReactionMessage(
      userId: $userId
      messageId: $messageId
      reactionTypeId: $reactionTypeId
    ) {
      messageId
      userId
      message
      reactionTypeId
    }
  }
`;

export const UNLIKE_MESSAGE = gql`
  mutation ($userId: Int, $messageId: Int, $reactionTypeId: Int) {
    deleteReactionMessage(
      userId: $userId
      messageId: $messageId
      reactionTypeId: $reactionTypeId
    ) {
      messageId
      userId
      message
      reactionTypeId
    }
  }
`;
