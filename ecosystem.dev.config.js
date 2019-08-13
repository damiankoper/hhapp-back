module.exports = {
  apps: [{
      name: 'hhapp-back-dev',
      script: 'dist/index.js',
      watch: 'dist/**/*.js',
      autorestart: false,
      max_memory_restart: '1G',
      interpreter_args: '--inspect=0.0.0.0'
    },
    {
      name: 'hhapp-back-dev-watcher',
      script: 'npm run watch:docker',
      watch: 'tsconfig.json',
      max_memory_restart: '1G'
    }
  ]
};
