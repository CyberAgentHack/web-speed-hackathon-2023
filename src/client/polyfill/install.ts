// TODO 本当は必要かもこの２つ
// import 'core-js';
// import 'date-time-format-timezone';
import 'setimmediate';
import './temporal';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    setImmediate: <T extends unknown[]>(callback: (...args: T) => void, ...args: T) => number;
    clearImmediate: (handle: number) => void;
  }
}
