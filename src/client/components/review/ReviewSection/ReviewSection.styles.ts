import { css } from '@emotion/css';

export const form = () => css`
  display: grid;
  gap: 24px;
  margin-top: 40px;
`;

export const commentTextAreaWrapper = () => css`
  display: grid;
  gap: 4px;
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
