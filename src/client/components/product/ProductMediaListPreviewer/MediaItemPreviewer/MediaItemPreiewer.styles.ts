import { css } from '@emotion/css';

export const container = () => css`
  display: flex;
`;

export const video = () => css`
  height: auto;
  object-fit: cover;
  width: 100%;
`;

export const video__mobile = () => css`
  max-width: 100vw;
`;

export const video__desktop = () => css`
  max-width: 1024px;
`;
