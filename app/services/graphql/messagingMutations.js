import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $authUserId: Int
    $recipientUserId: [BigInt]
    $message: String
  ) {
    sendMessage(
      authUserId: $authUserId
      recipientUserId: $recipientUserId
      message: $message
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

export const DELETE_MESSAGE = gql`
  mutation ($messageId: Int, $userId: Int) {
    deleteMessage(messageId: $messageId, userId: $userId) {
      messageId
      userId
      message
    }
  }
`;
