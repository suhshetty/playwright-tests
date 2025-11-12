// File: tools/generate_visual_report.mjs
import fs from 'fs';
import path from 'path';

function usageAndExit() {
  console.log('Usage: node tools/generate_visual_report.mjs --diffDir <diffDir> [--url1Dir <url1Dir>] [--url2Dir <url2Dir>] [--out <outHtml>]');
  process.exit(1);
}

// Simple arg parsing
const args = process.argv.slice(2);
let diffDir = 'screenshots/diffs';
let url1Dir = 'screenshots/url1';
let url2Dir = 'screenshots/url2';
let outHtml = null;

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--diffDir') diffDir = args[++i];
  else if (a === '--url1Dir') url1Dir = args[++i];
  else if (a === '--url2Dir') url2Dir = args[++i];
  else if (a === '--out') outHtml = args[++i];
  else { usageAndExit(); }
}

if (!fs.existsSync(diffDir)) {
  console.error(`diffDir not found: ${diffDir}`);
  process.exit(2);
}

const diffFiles = fs.readdirSync(diffDir).filter(f => f.toLowerCase().endsWith('.png'));
if (diffFiles.length === 0) {
  console.warn(`No .png files found in ${diffDir}`);
}

// default out path
if (!outHtml) {
  outHtml = path.join(diffDir, 'visual-report.html');
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Build rows
const rows = diffFiles.map(file => {
  // paths relative to the generated HTML file
  const relDiff = `./${file}`;
  const relUrl1 = path.relative(path.dirname(outHtml), path.join(url1Dir, file)).replace(/\\/g, '/');
  const relUrl2 = path.relative(path.dirname(outHtml), path.join(url2Dir, file)).replace(/\\/g, '/');

  // If corresponding url1/url2 images missing, show placeholder text
  const url1Exists = fs.existsSync(path.join(url1Dir, file));
  const url2Exists = fs.existsSync(path.join(url2Dir, file));

  return `
    <tr>
      <td style="text-align:center">${escapeHtml(file)}</td>
      <td style="text-align:center">${url1Exists ? `<img src="${relUrl1}" width="360">` : '<em>missing</em>'}</td>
      <td style="text-align:center">${url2Exists ? `<img src="${relUrl2}" width="360">` : '<em>missing</em>'}</td>
      <td style="text-align:center"><img src="${relDiff}" width="360"></td>
    </tr>
  `;
}).join('\n');

// basic CSS for quick browsing
const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Visual Diff Report</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; padding: 18px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; vertical-align: top; }
    th { background: #f4f4f4; }
    img { max-width: 100%; height: auto; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
    .meta { margin-bottom: 12px; color: #666; }
    .small { font-size: 0.9em; color: #777; }
  </style>
</head>
<body>
  <h1>Visual Diff Report</h1>
  <div class="meta small">diffDir: ${escapeHtml(diffDir)} — url1: ${escapeHtml(url1Dir)} — url2: ${escapeHtml(url2Dir)} — generated: ${new Date().toLocaleString()}</div>
  <table>
    <thead>
      <tr>
        <th>file</th><th>URL1</th><th>URL2</th><th>DIFF</th>
      </tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="4" style="text-align:center"><em>No diffs found</em></td></tr>'}
    </tbody>
  </table>
</body>
</html>`;

fs.writeFileSync(outHtml, html, 'utf8');
console.log('✅ Visual diff report generated:', outHtml);
