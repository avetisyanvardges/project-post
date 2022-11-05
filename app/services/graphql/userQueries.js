import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query ($recipientUserId: Int, $authUserId: Int) {
    user(recipientUserId: $recipientUserId, authUserId: $authUserId) {
      isFollowing
      userId
      username
      profileName
      avatar
      level
      city
      country
      bio {
        content
        hashtags {
          hashtag
          tagid
        }
        mentions {
          userid
          username
        }
      }
      bioLink
      tags {
        userTagId
        name
      }
    }
  }
`;

export const USER = gql`
  query ($recipientUserId: Int, $authUserId: Int) {
    user(recipientUserId: $recipientUserId, authUserId: $authUserId) {
      isFollowing
      userId
      username
      profileName
      avatar
      level
      city
      country
      bio {
        content
        hashtags {
          hashtag
          tagid
        }
        mentions {
          userid
          username
        }
      }
      bioLink
      tags {
        userTagId
        name
      }
    }
  }
`;

export const USER_AVATAR = gql`
  query ($recipientUserId: Int, $authUserId: Int) {
    user(recipientUserId: $recipientUserId, authUserId: $authUserId) {
      userId
      avatar
    }
  }
`;

export const USER_INFO = gql`
  query ($recipientUserId: Int, $authUserId: Int) {
    user(recipientUserId: $recipientUserId, authUserId: $authUserId) {
      isFollowing
      userId
      username
      profileName
      avatar
      level
      city
      country
      bio {
        content
        hashtags {
          hashtag
          tagid
        }
        mentions {
          username
          userid
        }
      }
      bioLink
      tags {
        userTagId
        name
      }
    }
  }
`;

export const USER_BASIC = gql`
  query userInfo($authUserId: Int, $recipientUserId: Int) {
    user(authUserId: $authUserId, recipientUserId: $recipientUserId) {
      userId
      username
      profileName
      avatar
      level
      isFollowing
    }
  }
`;

export const USER_COMMENT = gql`
  query ($recipientUserId: Int, $authUserId: Int) {
    user(recipientUserId: $recipientUserId, authUserId: $authUserId) {
      userId
      username
      avatar
    }
  }
`;

export const NUMBER_OF_FOLLOWERS = gql`
  query numberOfFollowers($userId: Int) {
    userFollowersAggregate(userId: $userId) {
      aggregate {
        count
      }
    }
  }
`;

export const NUMBER_OF_FOLLOWING = gql`
  query numberOfFollowing($userId: Int) {
    usersFollowingAggregate(userId: $userId) {
      aggregate {
        count
      }
    }
  }
`;

export const FOLLOWERS_LIST = gql`
  query ($userId: Int, $page: Int, $limit: Int) {
    userFollowers(userId: $userId, page: $page, limit: $limit) {
      users {
        userId
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const FOLLOWING_LIST = gql`
  query ($userId: Int, $page: Int, $limit: Int) {
    usersFollowing(userId: $userId, page: $page, limit: $limit) {
      users {
        userId
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const USER_PROFILE_TABS = gql`
  query userProfileTabs($userId: Int, $page: Int, $limit: Int) {
    userPosts(userId: $userId, page: $page, limit: $limit) {
      posts {
        postId
      }
      pageInfo {
        nextPage
        limit
      }
    }
    userItineraries(userId: $userId, page: $page, limit: $limit) {
      itineraries {
        itineraryId
      }
      pageInfo {
        nextPage
        limit
      }
    }
    userBadges(userId: $userId, page: $page, limit: $limit) {
      badges {
        userBadgeId
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const ALL_USER_TAGS = gql`
  query allUserTags {
    allUserTags {
      userTagId
      name
    }
  }
`;

export const BLOCKED_USERS = gql`
  query ($userId: Int) {
    blockedUsers(userId: $userId) {
      userId
    }
  }
`;
