module.exports = {
  apps: [{
    name: 'hhapp-back-dev',
    script: 'src/index.ts',
    watch: 'src/**/*.ts',
    autorestart: false,
    max_memory_restart: '1G',
    env: {
      NODE_OPTIONS: "--inspect=0.0.0.0"
    }
  }]
};
