// Build a new APK and publish it as a GitHub release; installed apps see it and offer the update.
// Usage: npm run release:android -- "What changed"
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts });
const file = 'src/appVersion.json';
const v = JSON.parse(fs.readFileSync(file, 'utf8'));
v.build += 1;
fs.writeFileSync(file, JSON.stringify(v, null, 1).replace(/\n\s*/g, ' ') + '\n');

run('npm run build:android', { env: { ...process.env, VITE_API_BASE: 'https://study.kaone.in' } });
run(process.platform === 'win32' ? '"' + path.resolve('android/gradlew.bat') + '" assembleDebug' : './gradlew assembleDebug', { cwd: 'android' });
fs.mkdirSync('release', { recursive: true });
fs.copyFileSync('android/app/build/outputs/apk/debug/app-debug.apk', 'release/StudyHub.apk');

const notes = process.argv.slice(2).join(' ') || 'New content and fixes.';
fs.writeFileSync('release/notes.txt', notes);
run(`gh release create v${v.build} release/StudyHub.apk --title "Study Hub v${v.build}" --notes-file release/notes.txt`);
console.log(`\nReleased v${v.build}. Commit ${file} so the next release counts up from here.`);
