import { css } from '@emotion/css';

export const container = () => css`
  width: 100%;
`;

export const inner = ({ width }: { width: number | undefined }) => css`
  margin: 0 auto;
  width: ${width}px;
`;
