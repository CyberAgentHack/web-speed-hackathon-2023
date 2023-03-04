import { css } from '@emotion/css';

export const container = () => css`
  display: grid;
  height: 50vh;
  place-items: center;
`;

export const inner = () => css`
  display: grid;
  gap: 16px;
  place-items: center;
`;

export const mainParagraph = () => css`
  color: #222222;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const subParagraph = () => css`
  color: #222222;
  font-size: 0.875rem;
`;
