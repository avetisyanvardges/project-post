import { gql } from "@apollo/client";

export const REPORT_POST = gql`
  mutation reportPost($reporterId: Int, $postId: Int, $reasonId: Int) {
    reportPost(reporterId: $reporterId, postId: $postId, reasonId: $reasonId) {
      message
      reasonId
      postId
    }
  }
`;

export const REPORT_USER = gql`
  mutation reportUser($reporterId: Int, $userId: Int, $reasonId: Int) {
    reportUser(reporterId: $reporterId, userId: $userId, reasonId: $reasonId) {
      message
      reasonId
      userId
    }
  }
`;
