import { css } from '@emotion/css';

export const container = ({ clientHeight }: { clientHeight: number | undefined }) => css`
  height: ${clientHeight ?? 0}px;
  position: relative;
  width: 100%;
`;
