const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const portfoliosDir = path.join(root, 'img', 'Portfolios en ligne modernes');
const outDir = path.join(root, 'generated');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const folders = fs.readdirSync(portfoliosDir, { withFileTypes: true }).filter(d => d.isDirectory());
let nextId = 200;
const models = [];

for (const folder of folders) {
  const folderPath = path.join(portfoliosDir, folder.name);
  const files = fs.readdirSync(folderPath).filter(f => /\.(png|jpg|jpeg|webp|svg)$/i.test(f));
  if (files.length === 0) continue;
  const images = files.map(f => `/Portfolios en ligne modernes/${folder.name}/${f}`);
  models.push({ id: nextId + models.length + 1, imageSrc: images[0], alt: folder.name, images });
}

fs.writeFileSync(path.join(outDir, 'portfolios-generated.json'), JSON.stringify(models, null, 2), 'utf8');
console.log('Generated', models.length, 'models in generated/portfolios-generated.json');
