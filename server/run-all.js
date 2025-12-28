const { spawnSync, spawn } = require("child_process");
const fs = require("fs");

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    ...options,
  });
}

function ensureRedisRunning() {
  console.log("🔍 Checking Redis container...");

  const check = spawnSync(
    "docker",
    ["ps", "-a", "--filter", "name=unidesk-redis", "--format", "{{.Names}}"],
    { encoding: "utf-8", shell: true }
  );

  const exists = check.stdout.trim() === "unidesk-redis";

  if (!exists) {
    console.log("📦 Redis container not found. Creating...");
    run("docker", [
      "run",
      "-d",
      "--name",
      "unidesk-redis",
      "-p",
      "6379:6379",
      "redis:7",
    ]);
    return;
  }

  const runningCheck = spawnSync(
    "docker",
    ["ps", "--filter", "name=unidesk-redis", "--format", "{{.Names}}"],
    { encoding: "utf-8", shell: true }
  );

  const running = runningCheck.stdout.trim() === "unidesk-redis";

  if (!running) {
    console.log("▶️ Redis container exists but stopped. Starting...");
    run("docker", ["start", "unidesk-redis"]);
  } else {
    console.log("✅ Redis is already running.");
  }
}

ensureRedisRunning();

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
