import { gql } from '@apollo/client';

export const SignInMutation = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`;
export type SignInMutationResponse = boolean;

export const SignUpMutation = gql`
  mutation SignUp($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password)
  }
`;
export type SignUpMutationResponse = boolean;

export const SendReviewMutation = gql`
  mutation SendReview($productId: Int!, $comment: String!) {
    sendReview(productId: $productId, comment: $comment)
  }
`;
export type SendReviewMutationResponse = boolean;

export const UpdateItemInShoppingCartMutation = gql`
  mutation UpdateItemInShoppingCart($productId: Int!, $amount: Int!) {
    updateItemInShoppingCart(productId: $productId, amount: $amount)
  }
`;
export type UpdateItemInShoppingCartMutationResponse = boolean;

export const OrderItemsInShoppingCartMutation = gql`
  mutation OrderItemsInShoppingCart($zipCode: String!, $address: String!) {
    orderItemsInShoppingCart(zipCode: $zipCode, address: $address)
  }
`;
export type OrderItemsInShoppingCartMutationResponse = boolean;
