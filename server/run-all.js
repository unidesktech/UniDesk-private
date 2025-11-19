const { spawn } = require("child_process");
const fs = require("fs");

const apps = fs.readdirSync("./apps");

apps.forEach(app => {
  console.log(`🚀 Starting ${app} service...`);

  const child = spawn("npx", ["nest", "start", app, "--watch"], {
    shell: true,
    stdio: "pipe"
  });

  child.stdout.on("data", data => {
    process.stdout.write(`[${app}] ${data}`);
  });

  child.stderr.on("data", data => {
    process.stderr.write(`[${app} ERROR] ${data}`);
  });

  child.on("exit", code => {
    console.log(`[${app}] process exited with code ${code}`);
  });
});
