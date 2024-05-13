import { gql } from "@apollo/client";

export const ME = gql`
  query Me($id: uuid!) @cached {
    Userss_by_pk(Id: $id) {
      Id
      Name
      Email
    }
  }
`;

export const TODOS = gql`
  query Todos($id: uuid!) {
    Todos(where: { Created_By: { _eq: $id } }) {
      Id
      Status
      Title
      Description
      Due_Date
      Created_Date
      Created_By
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query MyQuery($email: String!) @cached {
    Userss(where: { Email: { _eq: $email } }) {
      Email
      Id
      Password
    }
  }
`;
