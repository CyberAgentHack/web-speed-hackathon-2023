import { css } from '@emotion/css';

export const container = ({ color, height, width }: { width: number; height: number; color: string }) => css`
  color: ${color};
  height: ${height}px;
  width: ${width}px;
`;
