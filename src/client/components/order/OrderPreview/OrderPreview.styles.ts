import { css } from '@emotion/css';

export const container = () => css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const itemList = () => css`
  display: grid;
  gap: 16px;
  width: 100%;
`;

export const totalPrice = () => css`
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  font-size: 1.5rem;
  font-weight: 700;
  padding: 8px 0;
  text-align: right;
  width: 100%;
`;
