export const graphql = require("babel-plugin-relay/macro");

export const ParticipantList = graphql`
  fragment ParticipantList_campaign on Campaign {
    participants {
      id
      userId
      name
      campaignRoll
    }
  }
`;
