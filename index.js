const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 8080;

// 1. 保活逻辑：告诉 Choreo 程序在线
app.get('/', (req, res) => {
  res.status(200).send('<h1>Service is running on Choreo!</h1><p>Check logs or /list for links.</p>');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 2. 启动你的核心脚本
// 请确保你在 Choreo 的变量里填好了 UUID 和 ARGO_AUTH
exec('chmod +x ./entrypoint.sh && ./entrypoint.sh', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});
