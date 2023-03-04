import { css } from '@emotion/css';

export const container = () => css`
  color: #222222;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  gap: 8px;
`;

export const textarea = () => css`
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: #222222;
  font-size: 1rem;
  font-weight: 400;
  padding: 8px;

  &::placeholder {
    color: #999999;
  }
`;
