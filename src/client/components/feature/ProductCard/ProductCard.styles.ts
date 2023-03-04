import { css } from '@emotion/css';

export const inner = () => css`
  display: inline-grid;
  overflow: hidden;
  position: relative;
  width: 224px;
`;

export const label = () => css`
  left: 0;
  margin: 4px;
  position: absolute;
  top: 0;
`;

export const image = () => css`
  border-radius: 8px;
  display: grid;
  overflow: hidden;
`;

export const description = () => css`
  display: grid;
  padding: 4px;
`;

export const itemName = () => css`
  -webkit-box-orient: vertical;
  color: #222222;
  display: -webkit-box;
  height: 3rem;
  -webkit-line-clamp: 2;
  line-height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const itemPrice = () => css`
  color: #222222;
  justify-self: right;
`;
