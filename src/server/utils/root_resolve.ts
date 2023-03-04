import { realpathSync } from 'node:fs';
import { resolve } from 'node:path';

export const rootDirectory = realpathSync(process.cwd());
export const rootResolve = (...paths: string[]) => resolve(rootDirectory, ...paths);
