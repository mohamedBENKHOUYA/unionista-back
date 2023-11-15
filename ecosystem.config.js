const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'srv/api_pm2/current/dist/main.js',
      cwd: '/',
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: '1G',
      env_preprod: {
        PORT: 3001,
        NODE_ENV: 'preprod',
        JWT_ISSUER: 'UnionistaShop',
        JWT_TTL: '12h',
        TYPEORM_MIGRATIONS_DIR: 'scripts/migrations',
      },
    },
    {
      name: 'front',
      script: 'srv/front/main.js',
      cwd: '/',
      exec_mode: 'cluster_mode',
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: '2G',
      env_preprod: {
        PORT: 4001,
        NODE_ENV: 'preprod',
      },
      env_prod: {
        PORT: 4001,
        NODE_ENV: 'prod',
      },
    },
  ],
  deploy: {
    preprod: {
      user: 'root',
      ssh_options: 'StrictHostKeyChecking=no',
      host: '195.35.48.180',
      ref: 'origin/dev',
      key: 'deploy.key',
      repo: 'git@github.com:neoxia/site-neoxia-2022-api.git',
      path: '/srv/api_pm2',
      'post-deploy':
        'npm install && ls -a && npm run migration:run && npm run build && pm2 kill && pm2 reload ecosystem.config.js --env preprod --update-env && pm2 save',
    },
  },
};
