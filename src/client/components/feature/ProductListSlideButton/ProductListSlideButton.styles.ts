import { css } from '@emotion/css';

export const container = () => css`
  background: #e5e5e5;
  border-radius: 100%;
  cursor: pointer;
  display: grid;
  height: 36px;
  opacity: 1;
  place-items: center;
  width: 36px;
`;

export const container__disabled = () => css`
  cursor: default;
  opacity: 0.5;
`;
