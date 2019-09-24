module.exports = {
  apps: [{
      name: 'hhapp-back-prod',
      script: 'dist/index.js',
      max_memory_restart: '1G'
    }
  ]
};
