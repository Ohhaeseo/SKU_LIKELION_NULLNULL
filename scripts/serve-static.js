const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.resolve(__dirname, '..', 'dist');
const portArgIndex = process.argv.findIndex((arg) => arg === '--port');
const port = Number(process.env.PORT || (portArgIndex >= 0 ? process.argv[portArgIndex + 1] : 8082));

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

function resolveRequest(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const cleanPath = decoded === '/' ? '/index.html' : decoded;
  const candidates = [
    cleanPath,
    `${cleanPath}.html`,
    path.join(cleanPath, 'index.html'),
  ];

  for (const candidate of candidates) {
    const filePath = path.resolve(root, `.${candidate}`);
    if (filePath.startsWith(root) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return filePath;
    }
  }

  return path.join(root, '+not-found.html');
}

const server = http.createServer((req, res) => {
  const filePath = resolveRequest(req.url || '/');
  const ext = path.extname(filePath);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Static server error');
      return;
    }

    res.writeHead(filePath.endsWith('+not-found.html') ? 404 : 200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static web server running at http://localhost:${port}`);
});
