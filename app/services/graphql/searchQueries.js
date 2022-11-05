import { gql } from "@apollo/client";

export const GET_SEARCH_ALL = gql`
  query searchAll(
    $userId: Int
    $searchContent: String
    $checkInDate: String
    $checkOutDate: String
    $location: locationObject
  ) {
    searchAll(
      userId: $userId
      searchContent: $searchContent
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
      location: $location
    ) {
      users {
        userId
        username
        name
        avatar
        level
      }
      stays {
        isPost
        price
        location {
          city
          country
          latitude
          longitude
        }
        venue {
          venueId
          venueTypeId
          venueTypeName
        }
        thumbnail
        name
        user {
          userId
          username
          avatar
          level
          rating
        }
      }
      experiences {
        isPost
        price
        location {
          city
          country
          latitude
          longitude
        }
        venue {
          venueId
          venueTypeId
          venueTypeName
        }
        thumbnail
        name
        user {
          userId
          username
          avatar
          level
          rating
        }
      }
      carRentals {
        isPost
        price
        location {
          city
          country
          latitude
          longitude
        }
        venue {
          venueId
          venueTypeId
          venueTypeName
        }
        thumbnail
        name
        user {
          userId
          username
          avatar
          level
          rating
        }
      }
    }
  }
`;

export const GET_SEARCH_TAGS = gql`
  query searchtags(
    $userId: Int
    $searchContent: String
    $page: Int
    $limit: Int
  ) {
    searchTags(
      userId: $userId
      searchContent: $searchContent
      page: $page
      limit: $limit
    ) {
      tags {
        tagId
        hashtag
        posts {
          postId
        }
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const GET_SEARCH_VENUES = gql`
  query ($userId: Int, $searchContent: String, $page: Int, $limit: Int) {
    searchVenues(
      userId: $userId
      searchContent: $searchContent
      page: $page
      limit: $limit
    ) {
      venues {
        venue {
          venueId
          venueTitle
          venueType
          location {
            city
            state
            country
            latitude
            longitude
          }
          rating
        }

        posts {
          postId
        }
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;

export const GET_SEARCH_HISTORY_BY_USER_ID = gql`
  query getSearchHistoryByUserId($userId: Int) {
    searchHistory(userId: $userId) {
      searchTerm
      searchDate
    }
  }
`;

export const GET_SEARCH_RECOMMENDATIONS = gql`
  query ($userId: Int, $searchContent: String) {
    searchRecommendations(userId: $userId, searchContent: $searchContent) {
      venues {
        venueId
        venueName
      }
      hashtags {
        hashtagId
        hashtag
      }
      users {
        userId
        username
      }
    }
  }
`;
export const GET_SEARCH_TOP = gql`
  query (
    $userId: Int
    $searchContent: String
    $checkInDate: String
    $checkOutDate: String
    $location: locationObject
  ) {
    searchAll(
      userId: $userId
      searchContent: $searchContent
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
      location: $location
    ) {
      users {
        userId
      }
      results {
        isPost
        template {
          id
          type
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query ($recipientUserId: Int, $authUserId: Int) {
    user(recipientUserId: $recipientUserId, authUserId: $authUserId) {
      isFollowing
      userId
      username
      name
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
export const GET_SEARCH_USER = gql`
  query ($userId: Int, $searchContent: String, $page: Int, $limit: Int) {
    userResults(
      userId: $userId
      searchContent: $searchContent
      page: $page
      limit: $limit
    ) {
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
export const GET_SEARCH_EXPERIENCES = gql`
  query (
    $userId: Int
    $location: String
    $searchContent: String
    $filterContent: experiencesFilterObject
    $checkInDate: String
    $checkOutDate: String
    $page: Int
    $limit: Int
  ) {
    experienceResults(
      userId: $userId
      location: $location
      searchContent: $searchContent
      filterContent: $filterContent
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
      page: $page
      limit: $limit
    ) {
      experiences {
        isPost
        template {
          id
          type
        }
      }
      pageInfo {
        nextPage
        limit
      }
    }
  }
`;
