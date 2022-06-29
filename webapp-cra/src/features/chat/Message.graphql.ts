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
    isNew
    source {
      name
    }
    content {
      __typename
      ... on RollMessageContent {
        dmRoll
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
    messages(before: $cursor, last: $count)
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
          @appendNode(connections: $connections, edgeTypeName: "MessagesEdge") {
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
        updater: (store, data) => {
          data.textMessageAdd.message?.forEach((m) => {
            const message = store.get(m.id)!;
            message.setValue(true, "isNew");
          });
        },
      });
    },
    [_commit, connectionID, onCompleted]
  );

  return [commit, isInFlight];
}

export function useRollMessageAddMutation(): [
  (input: RollMessagesAddInput, onComplete?: () => void) => Disposable,
  boolean
] {
  const [_commit, isInFlight] = useMutation<MessageRollAddMutation>(graphql`
    mutation MessageRollAddMutation(
      $input: RollMessagesAddInput!
      $connections: [ID!]!
    ) {
      rollMessageAdd(input: $input) {
        message
          @appendNode(connections: $connections, edgeTypeName: "MessagesEdge") {
          id
          ...MessageBody_message
        }
      }
    }
  `);

  const commit = useCallback(
    (input: RollMessagesAddInput, onCompleted?: () => void) => {
      const connectionID = ConnectionHandler.getConnectionID(
        input.campaignId, // passed as input to the mutation/subscription
        "CampaignFragment_messages"
      );
      return _commit({
        variables: {
          input,
          connections: [connectionID],
        },
        onCompleted,
        updater: (store, data) => {
          data.rollMessageAdd.message?.forEach((m) => {
            const message = store.get(m.id)!;
            message.setValue(true, "isNew");
          });
        },
      });
    },
    [_commit]
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
              @appendNode(
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
      updater: (store, data) => {
        data.messageSub.messages.forEach((m) => {
          const message = store.get(m.id)!;
          message.setValue(true, "isNew");
        });
      },
    }),
    [campaignId, connectionID]
  );

  useSubscription(config);
}
