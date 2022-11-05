import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation followUser($authUserId: BigInt, $recipientUserId: BigInt) {
    addUserFollow(authUserId: $authUserId, recipientUserId: $recipientUserId) {
      followingAggregate {
        aggregate {
          count
        }
      }
      message
      authUserId
      recipientUserId
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unFollowUser($authUserId: BigInt, $recipientUserId: BigInt) {
    deleteUserFollow(
      authUserId: $authUserId
      recipientUserId: $recipientUserId
    ) {
      followingAggregate {
        aggregate {
          count
        }
      }
      message
      authUserId
      recipientUserId
    }
  }
`;

export const UPDATE_USER_TAGS = gql`
  mutation updateUserTags($userId: BigInt, $tags: [BigInt]) {
    updateUserTags(userId: $userId, tags: $tags) {
      message
      userId
      userTags {
        name
        userTagId
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $userId: BigInt
    $name: String
    $location: locationObject
    $bio: String
    $bioLink: String
  ) {
    updateUser(
      userId: $userId
      name: $name
      location: $location
      bio: $bio
      bioLink: $bioLink
    ) {
      message
      userId
      name
      bio
      bioLink
      location {
        city
        country
        state
        latitude
        longitude
      }
    }
  }
`;

export const BLOCK_USER = gql`
  mutation ($authUserId: Int, $recipientUserId: Int) {
    blockUser(authUserId: $authUserId, recipientUserId: $recipientUserId) {
      message
      authUserId
      recipientUserId
    }
  }
`;

export const UNBLOCK_USER = gql`
  mutation ($authUserId: Int, $recipientUserId: Int) {
    removeBlockedUser(
      authUserId: $authUserId
      recipientUserId: $recipientUserId
    ) {
      message
      authUserId
      recipientUserId
    }
  }
`;
