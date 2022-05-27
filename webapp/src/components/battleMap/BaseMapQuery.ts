import { graphql } from "relay-runtime";

export const BaseMapQuery = graphql`
  query BaseMapQuery {
    tokens {
      id
      ...BaseMapQueryToken
    }
  }
`;

export const BaseMapQueryTokenFragment = graphql`
  fragment BaseMapQueryToken on Token {
    x
    y
    width
    height
  }
`;
