const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).send('<h1>Server is running!</h1>');
});

app.get('/sub', (req, res) => {
  const subFile = path.join(__dirname, 'sub.txt');
  if (fs.existsSync(subFile)) {
    res.sendFile(subFile);
  } else {
    res.status(404).send('Wait 1 min for nodes...');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 使用 spawn 实时输出后台脚本日志
const child = spawn('sh', ['./entrypoint.sh']);

child.stdout.on('data', (data) => {
  console.log(`STDOUT: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`STDERR: ${data}`);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
