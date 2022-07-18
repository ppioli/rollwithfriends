import { graphql } from "relay-runtime";

export const ParticipantList = graphql`
  fragment ParticipantList_campaign on Campaign {
    participants {
      userId
      playerName
      roll
    }
  }
`;
