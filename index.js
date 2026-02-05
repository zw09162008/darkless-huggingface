const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('<h1>Server Online</h1>'));
app.get('/sub', (req, res) => {
  const subFile = path.join(__dirname, 'sub.txt');
  if (fs.existsSync(subFile)) res.sendFile(subFile);
  else res.status(404).send('Nodes generating, please wait 10s...');
});

app.listen(port, () => console.log(`HTTP Server running on port ${port}`));

// 关键：使用 spawn 实时把后台脚本的日志“导流”到控制台
const child = spawn('sh', ['./entrypoint.sh']);

child.stdout.on('data', (data) => console.log(`[SCRIPT OUTPUT]: ${data}`));
child.stderr.on('data', (data) => console.error(`[SCRIPT ERROR]: ${data}`));
child.on('close', (code) => console.log(`Background script exited with code ${code}`));
