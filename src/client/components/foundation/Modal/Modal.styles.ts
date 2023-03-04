import { css } from '@emotion/css';

export const container = () => css`
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

export const backdrop = () => css`
  background-color: black;
  inset: 0;
  opacity: 0.5;
  position: fixed;
  z-index: 100;
`;

export const inner = () => css`
  background-color: #ffffff;
  border-radius: 8px;
  max-width: 500px;
  width: calc(100vw - 24px);
`;
