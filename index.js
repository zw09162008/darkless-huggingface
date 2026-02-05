const { spawn, execSync } = require('child_process');

// ... 之前的 express 代码保持不变 ...

// 增加自动赋权逻辑
try {
  execSync('chmod +x ./entrypoint.sh');
  console.log('Successfully set execution permission for entrypoint.sh');
} catch (err) {
  console.error(`Failed to set permission: ${err.message}`);
}

const child = spawn('sh', ['./entrypoint.sh']);
// ... 后续的 stdout/stderr 监听保持不变 ...
