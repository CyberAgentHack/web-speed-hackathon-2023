import { css } from '@emotion/css';

export const inner = () => css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  padding: 24px;
`;

export const header = () => css`
  display: flex;
  justify-content: space-between;
`;

export const heading = () => css`
  font-size: 24px;
`;

export const switchToSignInButton = () => css`
  color: #3ba175;
`;

export const form = () => css`
  display: grid;
  gap: 24px;
`;

export const inputList = () => css`
  display: grid;
  gap: 16px;
`;

export const submitButton = () => css`
  justify-self: center;
`;

export const error = () => css`
  color: #b00020;
  font-size: 0.875rem;
  line-height: 1;
  min-height: 1em;
`;
