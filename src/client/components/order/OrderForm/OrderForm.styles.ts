import { css } from '@emotion/css';

export const container = () => css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const form = () => css`
  display: grid;
  gap: 80px;
`;

export const inputList = () => css`
  display: grid;
  gap: 16px;
`;

export const input = () => css`
  width: 100%;
`;

export const purchaseButton = () => css`
  justify-self: center;
`;
