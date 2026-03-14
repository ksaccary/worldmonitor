import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');
const PORT = 3117;

const mime = {
  '.html': 'text/html', '.js': 'application/javascript',
  '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

createServer((req, res) => {
  let p = req.url.split('?')[0];
  let file = join(DIST, p);
  try {
    if (!existsSync(file) || statSync(file).isDirectory()) file = join(DIST, 'index.html');
    const data = readFileSync(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(PORT, '0.0.0.0', () => console.log(`WorldMonitor running on http://0.0.0.0:${PORT}`));
