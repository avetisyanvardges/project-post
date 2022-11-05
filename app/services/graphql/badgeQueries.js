import {gql} from '@apollo/client';

export const BADGE_DETAILS = gql`
  query ($userBadgeId: Int) {
    userBadge(userBadgeId: $userBadgeId) {
      userBadgeId
      badgeId
      image
      name
      value
      badgeType
      dateEarned
    }
  }
`;

export const BADGE = gql`
  query ($userBadgeId: Int) {
    userBadge(userBadgeId: $userBadgeId) {
      userBadgeId
      badgeId
      image
      name
    }
  }
`;

export const USER_BADGES = gql`
  query userBadges($userId: Int) {
    userBadges(userId: $userId) {
      userBadgeId
    }
  }
`;
