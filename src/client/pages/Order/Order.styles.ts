import { css } from '@emotion/css';

export const container = () => css`
  padding: 24px 16px;
`;

export const cart = () => css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const cartHeading = () => css`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const addressForm = () => css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;

export const addressFormHeading = () => css`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const emptyContainer = () => css`
  padding: 24px 16px;
`;

export const emptyDescription = () => css`
  color: #222222;
  font-size: 0.875rem;
  padding: 80px 0;
  text-align: center;
`;
