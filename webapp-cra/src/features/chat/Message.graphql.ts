import {
  ConnectionHandler,
  Disposable,
  useMutation,
  useSubscription,
} from "react-relay";
import {
  MessageAddMutation,
  TextMessagesAddInput,
} from "features/chat/__generated__/MessageAddMutation.graphql";
import { useCallback, useMemo } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { MessageSubscription as MessageSubscriptionType } from "./__generated__/MessageSubscription.graphql";
import {
  MessageRollAddMutation,
  RollMessagesAddInput,
} from "features/chat/__generated__/MessageRollAddMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

export const MessageBodyFragment = graphql`
  fragment MessageBody_message on Message {
    userId
    createdAt
    content {
      __typename
      ... on RollMessageContent {
        rolls {
          count
          faces
          result
        }
      }
      ... on TextMessageContent {
        text
      }
    }
  }
`;

export const MessageListPaginationFragment = graphql`
  fragment MessageList_campaign on Campaign
  @refetchable(queryName: "MessageListPaginationFragment")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String", defaultValue: null }
  ) {
    messages(after: $cursor, first: $count)
      @connection(key: "CampaignFragment_messages") {
      totalCount
      edges {
        node {
          id
          ...MessageBody_message
        }
      }
    }
  }
`;

export function useTextMessageAddMutation(
  campaignId: string,
  onCompleted: () => void
): [(input: TextMessagesAddInput) => Disposable, boolean] {
  const connectionID = ConnectionHandler.getConnectionID(
    campaignId, // passed as input to the mutation/subscription
    "CampaignFragment_messages"
  );

  const [_commit, isInFlight] = useMutation<MessageAddMutation>(graphql`
    mutation MessageAddMutation(
      $input: TextMessagesAddInput!
      $connections: [ID!]!
    ) {
      textMessageAdd(input: $input) {
        message
          @prependNode(
            connections: $connections
            edgeTypeName: "MessagesEdge"
          ) {
          id
          ...MessageBody_message
        }
      }
    }
  `);

  const commit = useCallback(
    (input: TextMessagesAddInput) => {
      return _commit({
        variables: {
          input,
          connections: [connectionID],
        },
        onCompleted,
      });
    },
    [_commit, connectionID, onCompleted]
  );

  return [commit, isInFlight];
}

export function useRollMessageAddMutation(
  campaignId: string,
  onCompleted: () => void
): [(input: RollMessagesAddInput) => Disposable, boolean] {
  const connectionID = ConnectionHandler.getConnectionID(
    campaignId, // passed as input to the mutation/subscription
    "CampaignFragment_messages"
  );

  const [_commit, isInFlight] = useMutation<MessageRollAddMutation>(graphql`
    mutation MessageRollAddMutation(
      $input: RollMessagesAddInput!
      $connections: [ID!]!
    ) {
      rollMessageAdd(input: $input) {
        message
          @prependNode(
            connections: $connections
            edgeTypeName: "MessagesEdge"
          ) {
          id
          ...MessageBody_message
        }
      }
    }
  `);

  const commit = useCallback(
    (input: RollMessagesAddInput) => {
      return _commit({
        variables: {
          input,
          connections: [connectionID],
        },
        onCompleted,
      });
    },
    [_commit, connectionID, onCompleted]
  );

  return [commit, isInFlight];
}

export function useMessageSubscription(campaignId: string) {
  const connectionID = ConnectionHandler.getConnectionID(
    campaignId, // passed as input to the mutation/subscription
    "CampaignFragment_messages"
  );

  const config: GraphQLSubscriptionConfig<MessageSubscriptionType> = useMemo(
    () => ({
      subscription: graphql`
        subscription MessageSubscription(
          $campaignId: ID!
          $connections: [ID!]!
        ) {
          messageSub(campaignId: $campaignId) {
            messages
              @prependNode(
                connections: $connections
                edgeTypeName: "MessagesEdge"
              ) {
              id
              ...MessageBody_message
            }
          }
        }
      `,
      variables: {
        campaignId,
        connections: [connectionID],
      },
    }),
    [campaignId, connectionID]
  );

  useSubscription(config);
}
