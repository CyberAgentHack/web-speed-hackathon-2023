import { css } from '@emotion/css';

export const container = () => css`
  align-items: center;
  display: flex;
  gap: 8px;
  padding: 0 16px;
`;

export const slideButton = () => css`
  flex-grow: 0;
  flex-shrink: 0;
`;

export const listWrapper = () => css`
  overflow: hidden;
  width: 100%;
`;

export const list = ({ slideIndex, visibleItemCount }: { slideIndex: number; visibleItemCount: number }) => css`
  align-items: center;
  display: grid;
  grid-auto-columns: calc(100% / ${visibleItemCount});
  grid-auto-flow: column;
  justify-content: flex-start;
  transform: translateX(calc(${slideIndex} / ${visibleItemCount} * -100%));
  transition-duration: 0.5s;
  transition-property: transform;
  transition-timing-function: ease-out;
  width: 100%;
`;

export const item = () => css`
  align-items: flex-start;
  display: inline-flex;
  justify-content: center;
  margin: 0px 8px;
`;

export const item__hidden = () => css`
  opacity: 0.5;
  pointer-events: none;
`;
