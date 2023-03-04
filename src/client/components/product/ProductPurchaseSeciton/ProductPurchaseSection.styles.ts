import { css } from '@emotion/css';

export const container = () => css`
  display: flex;
  flex-direction: column;
`;

export const amount = () => css`
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  gap: 4px;
  justify-content: flex-end;
  line-height: 24px;
`;

export const checkIcon = () => css`
  display: inline-flex;
`;

export const actionButtonList = () => css`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const signInWrapper = () => css`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const signIn = () => css`
  font-size: 0.875rem;
`;
