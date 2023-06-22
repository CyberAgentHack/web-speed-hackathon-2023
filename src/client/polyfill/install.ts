import 'setimmediate';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    setImmediate: <T extends unknown[]>(callback: (...args: T) => void, ...args: T) => number;
    clearImmediate: (handle: number) => void;
  }
}
