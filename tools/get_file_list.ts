import fs from 'node:fs/promises';
import path from 'node:path';

export async function getFileList(parent: string): Promise<string[]> {
  const list: string[] = [];
  const dirents = await fs.readdir(parent, { withFileTypes: true });

  for (const dirent of dirents) {
    if (dirent.isFile()) {
      if (dirent.name.startsWith('.')) {
        continue;
      }

      const file = path.join(parent, dirent.name);
      list.push(file);
      continue;
    }

    if (dirent.isDirectory()) {
      const directory = path.join(parent, dirent.name);
      const files = await getFileList(directory);
      list.push(...files);
      continue;
    }
  }

  return list;
}
