import { gql } from "@apollo/client";

export const VENUE = gql`
  query venue($venueId: String, $postId: Int, $userId: Int) {
    venue(venueId: $venueId, postId: $postId, userId: $userId) {
      venueId
      venueType
      featuredMedia {
        isVideo
        media {
          url
        }
      }
      title
      location {
        city
        state
        country
        latitude
        longitude
      }
      price
      priceWithTax
      isRefundable
      sharedBy {
        userId
      }
      shortDescription
      gallery {
        url
      }
      vendorVenueId
    }
  }
`;

export const GET_VENUE = gql`
  query ($venueId: Int, $postId: Int, $userId: Int) {
    venue(venueId: $venueId, postId: $postId, userId: $userId) {
      venueId
      venueType
      language
      featuredMedia {
        isVideo
        media {
          url
        }
      }
      whatToBring
      whatWeProvide
      accessRestrictions {
        name
        shortDescription
      }
      cancellationPolicy {
        name
        shortDescription
      }
      title
      location {
        city
        state
        country
        latitude
        longitude
      }
      price
      priceWithTax
      isRefundable
      sharedBy {
        userId
      }
      shortDescription
      gallery {
        url
      }
      vendorVenueId
      vendorId
    }
  }
`;

export const VENUE_RATING = gql`
  query ($venueId: String) {
    venueRating(venueId: $venueId) {
      venueRating
      venueRatingAggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const VENUE_VENDOR = gql`
  query ($vendorVenueId: Int) {
    vendor(vendorVenueId: $vendorVenueId) {
      vendorId
      name
      avatar
      bioUrl
      shortDescription
      rating
      noOfRatings
    }
  }
`;

export const VENUE_AVAILABLE_DATES = gql`
  query ($venueId: String, $userId: Int) {
    venueAvailableDates(venueId: $venueId, userId: $userId) {
      dates
    }
  }
`;

export const VENUE_BOOKING_OPTIONS = gql`
  query ($venueId: String, $userId: Int, $date: String) {
    venueBookingOptions(venueId: $venueId, userId: $userId, date: $date) {
      Ids
    }
  }
`;

export const VENUE_BOOKING_OPTION_INFO = gql`
  query ($userId: Int, $venueBookingOptionId: Int) {
    venueBookingOption(
      userId: $userId
      venueBookingOptionId: $venueBookingOptionId
    ) {
      time
      title
      price
      duration {
        unit
        value
      }
      guestsLimit
      shortDescription
    }
  }
`;
