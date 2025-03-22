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
  execSync(`mkdir src/components/${componentName}`);
  execSync(`touch src/components/${componentName}/index.ts`);
  execSync(`touch src/components/${componentName}/types.ts`);
  execSync(`touch src/components/${componentName}/${componentName}.tsx`);
  execSync(`touch src/components/${componentName}/${componentName}.test.tsx`);
  execSync(
    `touch src/components/${componentName}/${componentName}.stories.tsx`
  );
  console.log(`✅ Added ${componentName} component`);
} catch (error) {
  console.error('Failed to add component:', error);
  process.exit(1);
}
