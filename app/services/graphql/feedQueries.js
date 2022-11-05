import {gql} from '@apollo/client';

export const FOLLOWING_FEED = gql`
  query getFollowingFeed($userId: Int, $page: Int, $limit: Int) {
    followingFeed(userId: $userId, page: $page, limit: $limit) {
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

export const DISCOVERY_FEED = gql`
  query getDiscoveryFeed($userId: Int, $page: Int, $limit: Int) {
    discoveryFeed(userId: $userId, page: $page, limit: $limit) {
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

export const DISCOVERY_FEED_V2 = gql`
  query getDiscoveryFeed($userId: Int, $page: Int, $limit: Int) {
    discoveryFeeds(userId: $userId, page: $page, limit: $limit) {
      postId
    }
  }
`;
