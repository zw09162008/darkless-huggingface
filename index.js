const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.status(200).send('<h1>Server Online</h1>'));
app.get('/sub', (req, res) => {
  const subFile = path.join(__dirname, 'sub.txt');
  if (fs.existsSync(subFile)) res.sendFile(subFile);
  else res.status(404).send('Still generating nodes, wait 10s...');
});

app.listen(port, () => console.log(`HTTP Server running on port ${port}`));

// 关键：实时透传后台脚本日志
const child = spawn('sh', ['./entrypoint.sh']);

child.stdout.on('data', (data) => console.log(`[SCRIPT STDOUT]: ${data}`));
child.stderr.on('data', (data) => console.error(`[SCRIPT ERR]: ${data}`));
child.on('close', (code) => console.log(`Script exited with code ${code}`));
