import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation insert_Todos_one($data: Todos_insert_input!) {
    insert_Todos_one(object: $data) {
      Id
      Status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation delete_Todos_by_pk($id: uuid!) {
    delete_Todos_by_pk(Id: $id) {
      Id
      Is_Deleted
    }
  }
`;

export const UPDATE_TO_BY_PK = gql`
  mutation update_Todos_by_pk(
    $id: Todos_pk_columns_input!
    $data: Todos_set_input
  ) {
    update_Todos_by_pk(pk_columns: $id, _set: $data) {
      Id
      Due_Date
      Description
      Title
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation signUp($data: Userss_insert_input!) {
    insert_Userss_one(object: $data) {
      Email
      Id
      Name
      Password
    }
  }
`;
