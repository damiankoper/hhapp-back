module.exports = {
  apps: [{
      name: 'hhapp-back-dev',
      cwd:'dist',
      script: 'index.js',
      watch: '**/*.js',
      autorestart: false,
      max_memory_restart: '1G',
      env: {
        NODE_OPTIONS: "--inspect=0.0.0.0"
      }
    },
    {
      name: 'hhapp-back-dev-watcher',
      script: 'npm run watch',
      instances: 1,
      autorestart: true,
      watch: 'tsconfig.json'
    }
  ]
};
