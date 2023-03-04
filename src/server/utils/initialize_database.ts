import fs from 'node:fs/promises';

import { DATABASE_PATH, DATABASE_SEED_PATH } from './database_paths';

export const initializeDatabase = async () => {
  await fs.copyFile(DATABASE_SEED_PATH, DATABASE_PATH);
};
