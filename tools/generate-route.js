#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Ambil argumen CLI
// Format yang diharapkan:
// npm run gen -cp testing
// argv = ["-cp", "testing"]
const argv = process.argv.slice(2);

// Deteksi flag
const isControlPanel = argv.includes('-cp');

// Ambil route = arg pertama yang bukan flag
const route = argv.find((arg) => !arg.startsWith('-'));

if (!route) {
  console.log('\nUsage:');
  console.log('  npm run gen <route>');
  console.log('  npm run gen -cp <route>   (generate dalam (ControlPanel))');
  console.log();
  process.exit(1);
}

// Tentukan base folder
let baseFolder = 'app';
if (isControlPanel) {
  baseFolder = path.join('app', '(ControlPanel)');
}

// Final directory
const baseDir = path.join(process.cwd(), baseFolder, route);

// Buat folder
fs.mkdirSync(baseDir, { recursive: true });

// Nama komponen PascalCase
const lastSeg = route.split('/').pop();
const pascalName = lastSeg.replace(/(^\w|-\w)/g, (c) =>
  c.replace('-', '').toUpperCase(),
);

// File path
const pagePath = path.join(baseDir, 'page.tsx');
const loadingPath = path.join(baseDir, 'loading.tsx');

// PAGE TEMPLATE
const pageContent = `import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';

export default function ${pascalName}Page() {
  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-xl font-semibold">${pascalName} Page</h1>
      </ContentCard>
    </div>
  );
}
`;

// LOADING TEMPLATE
const loadingContent = `'use client';

import { Spinner } from '@/components/ui/spinner';

export default function ${pascalName}Loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
}
`;

// SAFE WRITE FUNCTION
function writeIfNotExists(file, content) {
  if (fs.existsSync(file)) {
    console.log(`⚠ Exists, skipped: ${file}`);
  } else {
    fs.writeFileSync(file, content);
    console.log(`✓ Created: ${file}`);
  }
}

writeIfNotExists(pagePath, pageContent);
writeIfNotExists(loadingPath, loadingContent);

console.log('\nDone.');
