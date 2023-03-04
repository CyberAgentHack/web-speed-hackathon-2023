import { rootResolve } from './root_resolve';

export const DATABASE_PATH = rootResolve('databases/database.sqlite');
export const DATABASE_SEED_PATH = rootResolve('databases/database.seed.sqlite');
