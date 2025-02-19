#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

try {
  execSync(`npx shadcn@latest add ${componentName} --yes`, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });
  console.log(`✅ Added ${componentName} component`);
} catch (error) {
  console.error('Failed to add component:', error);
  process.exit(1);
}
