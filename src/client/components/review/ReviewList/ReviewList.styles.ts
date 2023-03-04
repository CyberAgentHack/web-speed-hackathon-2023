import { css } from '@emotion/css';

export const itemList = () => css`
  display: grid;
  gap: 16px;
`;

export const item = () => css`
  align-items: center;
  display: flex;
  gap: 8px;
  padding: 4px 0;
`;

export const avaterImage = () => css`
  border-radius: 50%;
  overflow: hidden;
`;

export const content = () => css`
  display: grid;
  flex: 1;
`;

export const time = () => css`
  color: #999999;
  font-size: 0.75rem;
`;

export const comment = () => css`
  color: #222222;
  font-size: 0.875rem;
  line-height: 20px;
  min-height: 20px;
`;
