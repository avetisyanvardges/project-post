import { gql } from "@apollo/client";

export const SHARE_POST = gql`
  mutation (
    $authUserId: Int
    $recipientUserId: [BigInt]
    $message: String
    $shareObj: ShareObjectType
  ) {
    sharedAttachment(
      authUserId: $authUserId
      recipientUserId: $recipientUserId
      message: $message
      shareObj: $shareObj
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

export const SHARE_VENUE = gql`
  mutation (
    $authUserId: Int
    $recipientUserId: [BigInt]
    $message: String
    $shareObj: ShareObjectType
  ) {
    sharedAttachment(
      authUserId: $authUserId
      recipientUserId: $recipientUserId
      message: $message
      shareObj: $shareObj
    ) {
      messageId
      threadId
      recipientUserId
      authUserId
    }
  }
`;
