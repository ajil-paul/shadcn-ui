#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

const componentName = process.argv[2];

if (!componentName) {
  console.error("Please provide a component name");
  process.exit(1);
}

try {
  execSync(`npx shadcn-ui@latest add ${componentName} --yes`, {
    stdio: "inherit",
    cwd: path.resolve(__dirname, ".."),
  });
  console.log(`✅ Added ${componentName} component`);
} catch (error) {
  console.error("Failed to add component:", error);
  process.exit(1);
}
