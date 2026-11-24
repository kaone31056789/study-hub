// Generates PWA / Android icons from public/favicon.svg  (run: node scripts/icons.mjs)
import sharp from 'sharp';
const svg = 'public/favicon.svg';
await sharp(svg, { density: 512 }).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(svg, { density: 1024 }).resize(512, 512).png().toFile('public/icon-512.png');
const inner = await sharp(svg, { density: 1024 }).resize(360, 360).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#ffd43b' } }).composite([{ input: inner, gravity: 'center' }]).png().toFile('public/icon-maskable-512.png');
await sharp(svg, { density: 512 }).resize(180, 180).flatten({ background: '#f5f4ef' }).png().toFile('public/apple-touch-icon.png');
console.log('icons ok');
