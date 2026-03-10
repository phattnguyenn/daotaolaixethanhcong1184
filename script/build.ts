import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');

console.log('Building client...');
try {
  execSync('vite build', { stdio: 'inherit', cwd: root });
} catch (error) {
  console.error('Client build failed:', error);
  process.exit(1);
}

console.log('Building server...');
try {
  execSync('esbuild server/index.ts --bundle --platform=node --target=node20 --outfile=dist/index.cjs --external:ws --external:express --external:passport', 
    { stdio: 'inherit', cwd: root });
} catch (error) {
  console.error('Server build failed:', error);
  process.exit(1);
}

console.log('Build complete!');
