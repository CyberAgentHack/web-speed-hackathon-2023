import { css } from '@emotion/css';

export const container = () => css`
  display: grid;
  gap: 8px;
  overflow-x: hidden;
`;

export const itemListWrapper = () => css`
  display: grid;
  overflow-x: scroll;
  place-items: center;
`;

export const itemList = () => css`
  display: flex;
  gap: 8px;
  justify-content: center;
  padding: 0 24px 8px;
  width: fit-content;
`;

export const item = () => css`
  height: 40px;
  width: 40px;
`;

export const itemSelectButton = () => css`
  display: inline-flex;
  height: 100%;
  opacity: 1;
  pointer-events: auto;
  width: 100%;
`;

export const itemSelectButton__disabled = () => css`
  opacity: 0.5;
  pointer-events: none;
`;
