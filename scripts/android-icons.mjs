// Writes Study Hub launcher icons into the Android project (run after `npx cap add android`)
import sharp from 'sharp';
import { existsSync } from 'node:fs';
const sizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
const fg = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 };
for (const [d, px] of Object.entries(sizes)) {
  const dir = `android/app/src/main/res/mipmap-${d}`;
  if (!existsSync(dir)) continue;
  const icon = sharp('public/favicon.svg', { density: 1024 }).resize(px, px).png();
  await icon.clone().toFile(`${dir}/ic_launcher.png`);
  await icon.clone().toFile(`${dir}/ic_launcher_round.png`);
  const f = fg[d], inner = Math.round(f * 0.62);
  const logo = await sharp('public/favicon.svg', { density: 1024 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: f, height: f, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: logo, gravity: 'center' }]).png().toFile(`${dir}/ic_launcher_foreground.png`);
}
console.log('android icons ok');
