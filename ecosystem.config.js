module.exports = {
  apps: [{
    name: "hanyu-xingjie",
    script: "./server.js",
    env_production: {
      NODE_ENV: "production",
      PORT: 80
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: "./logs/err.log",
    out_file: "./logs/out.log"
  }]
} 