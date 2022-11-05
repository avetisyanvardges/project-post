import { gql } from "@apollo/client";

export const REPORT_POST_REASON = gql`
  query {
    reportPostReasons {
      reportPostReasonId
      reason
    }
  }
`;

export const REPORT_USER_REASON = gql`
  query {
    reportUserReasons {
      reportUserReasonId
      reason
    }
  }
`;

export const REPORT_POST_REASON_DETAILS = gql`
  query ($userId: Int, $reportPostReasonId: Int) {
    reportPostReason(userId: $userId, reportPostReasonId: $reportPostReasonId) {
      reportPostReasonId
      reason
      description
    }
  }
`;

export const REPORT_USER_REASON_DETAILS = gql`
  query ($userId: Int, $reportUserReasonId: Int) {
    reportUserReason(userId: $userId, reportUserReasonId: $reportUserReasonId) {
      reportUserReasonId
      reason
      description
    }
  }
`;
