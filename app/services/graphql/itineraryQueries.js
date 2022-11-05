import { gql } from "@apollo/client";

export const ITINERARY = gql`
  query itinerary($userId: Int, $itineraryId: Int) {
    itinerary(userId: $userId, itineraryId: $itineraryId) {
      itineraryId
      title
      thumbnail
      description {
        content
        hashtags {
          tagid
          hashtag
        }
        mentions {
          userid
        }
      }
      userId
      posts {
        postId
      }
    }
  }
`;

export const ITINERARY_THUMBNAIL = gql`
  query itinerary($userId: Int, $itineraryId: Int) {
    itinerary(userId: $userId, itineraryId: $itineraryId) {
      itineraryId
      title
      thumbnail
    }
  }
`;

export const USER_ITINERARIES = gql`
  query userItineraries($userId: Int) {
    userItineraries(userId: $userId) {
      itineraryId
    }
  }
`;
