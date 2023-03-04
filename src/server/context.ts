import type { Session } from 'koa-session';

export type Context = {
  session: Session;
};
